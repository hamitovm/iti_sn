import {StateType} from "../../redux/redux-store";

import {connect} from "react-redux";
import {
    followAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    usersReducerActionType,
    UserType
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import {Users} from "./Users";

type UsersPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void

}

export class UsersClassComponent extends React.Component<UsersPropsType> {

    //componentDidMount() вызывается сразу после монтирования компонента (вставлено в DOM-дерево).
    // Инициализация, требующая DOM-узлов, должна быть здесь. Если вам нужно загружать данные с удалённой конечной точки (endpoint),
    // это хорошее место для создания экземпляра сетевого запроса.
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    // Реагирование на изменение номера страницы, отображение данных соответственно номеру страницы
    onPageNumberClickHandler = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (
            <Users users={this.props.users}
                   pageSize={this.props.pageSize}
                   totalUsersCount={this.props.totalUsersCount}
                   currentPage={this.props.currentPage}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}
                   onPageNumberClickHandler={this.onPageNumberClickHandler}/>
        )
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        users: state.usersPageData.users,
        pageSize: state.usersPageData.pageSize,
        totalUsersCount: state.usersPageData.totalUsersCount,
        currentPage: state.usersPageData.currentPage
    }
}

let mapDispatchToProps = (dispatch: (action: usersReducerActionType) => void ) => {
    return {
        followUser: (userId: number)=>{dispatch(followAC(userId))},
        unfollowUser: (userId: number)=>{dispatch(unfollowAC(userId))},
        setUsers: (users: Array<UserType>)=>{dispatch(setUsersAC(users))},
        setCurrentPage: (currentPage: number)=>{dispatch(setCurrentPageAC(currentPage))},
        setTotalUsersCount: (totalUsersCount: number)=>{dispatch(setTotalUsersCountAC(totalUsersCount))}
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClassComponent)