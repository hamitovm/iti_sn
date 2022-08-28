import {StateType} from "../../redux/redux-store";

import {connect} from "react-redux";
import {
    changeIsFetchingValueAC,
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
import {Preloader} from "../common/preloader";

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
    isFetching: boolean
    changeIsFetchingValue: (isFetchingValue: boolean) => void
}

export class UsersClassComponent extends React.Component<UsersPropsType> {

    //componentDidMount() вызывается сразу после монтирования компонента (вставлено в DOM-дерево).
    // Инициализация, требующая DOM-узлов, должна быть здесь. Если вам нужно загружать данные с удалённой конечной точки (endpoint),
    // это хорошее место для создания экземпляра сетевого запроса.
    //changeIsFetchingValue ставится true в момент начала загрузки данных и перед сетом возвращается false
    componentDidMount() {
        this.props.changeIsFetchingValue(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.changeIsFetchingValue(false)
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    // Реагирование на изменение номера страницы, отображение данных соответственно номеру страницы
    onPageNumberClickHandler = (pageNumber: number) => {
        this.props.changeIsFetchingValue(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.changeIsFetchingValue(false)
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (<>
                {this.props.isFetching ? <Preloader /> : null}
                <Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       followUser={this.props.followUser}
                       unfollowUser={this.props.unfollowUser}
                       onPageNumberClickHandler={this.onPageNumberClickHandler}
                       isFetching={this.props.isFetching}/>
        </>

        )
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        users: state.usersPageData.users,
        pageSize: state.usersPageData.pageSize,
        totalUsersCount: state.usersPageData.totalUsersCount,
        currentPage: state.usersPageData.currentPage,
        isFetching: state.usersPageData.isFetching
    }
}
//mapDispatchToProps - ниже вместо mapDispatchToProps в connect вторым параметром прокинут объект,
// в котором свойству соответствует не колбек с диспатчем результата вызова экшн криейтора, а сам экшн-криейтор - альтернативный вариант с более короткой записью
// let mapDispatchToProps = (dispatch: (action: usersReducerActionType) => void ) => {
//     return {
//         followUser: (userId: number)=>{dispatch(followAC(userId))},
//         unfollowUser: (userId: number)=>{dispatch(unfollowAC(userId))},
//         setUsers: (users: Array<UserType>)=>{dispatch(setUsersAC(users))},
//         setCurrentPage: (currentPage: number)=>{dispatch(setCurrentPageAC(currentPage))},
//         setTotalUsersCount: (totalUsersCount: number)=>{dispatch(setTotalUsersCountAC(totalUsersCount))},
//         changeIsFetchingValue: (isFetchingValue: boolean)=>{dispatch(changeIsFetchingValueAC(isFetchingValue))}
//     }
// }


export const UsersContainer = connect(mapStateToProps, {
    followUser: followAC,
    unfollowUser: unfollowAC,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    changeIsFetchingValue: changeIsFetchingValueAC
})(UsersClassComponent)