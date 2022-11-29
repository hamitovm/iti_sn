import {StateType} from "../../redux/redux-store";

import {connect} from "react-redux";
import {
    changeIsFetchingValueAC, changeIsFollowingProgressAC, follow,
    getUsersThunkCreator,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC, unfollow,
    UserType
} from "../../redux/users-reducer";
import React from "react";

import {Users} from "./Users";
import {Preloader} from "../common/preloader";
import {Navigate} from "react-router-dom";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";


type UsersClassComponentPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followUser: (id: number) => void,
    unfollowUser: (id: number) => void,
    setUsers: (users: Array<UserType>) => void,
    setCurrentPage: (currentPage: number) => void,
    setTotalUsersCount: (totalUsersCount: number) => void,
    isFetching: boolean,
    changeIsFetchingValue: (isFetchingValue: boolean) => void,
    changeIsFollowingProgress: (isFetchingData: boolean, userId: number) => void,
    followingInProgress: Array<number>,
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    isAuth: boolean

}

export class UsersClassComponent extends React.Component<UsersClassComponentPropsType> {




    //componentDidMount() вызывается сразу после монтирования компонента (вставлено в DOM-дерево).
    // Инициализация, требующая DOM-узлов, должна быть здесь. Если вам нужно загружать данные с удалённой конечной точки (endpoint),
    // это хорошее место для создания экземпляра сетевого запроса.

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }
    // Реагирование на изменение номера страницы, отображение данных соответственно номеру страницы
    onPageNumberClickHandler = (pageNumber: number) => {
        this.props.changeIsFetchingValue(true)
        this.props.setCurrentPage(pageNumber)
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
    }

    render() {
        // if (!this.props.isAuth) return <Navigate to={'/login'} />
        return (<>
                {this.props.isFetching ? <Preloader/> : null}
                <Users users={this.props.users}
                       pageSize={this.props.pageSize}
                       totalUsersCount={this.props.totalUsersCount}
                       currentPage={this.props.currentPage}
                       followUser={this.props.followUser}
                       unfollowUser={this.props.unfollowUser}
                       onPageNumberClickHandler={this.onPageNumberClickHandler}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
                       changeIsFollowingProgress={this.props.changeIsFollowingProgress}
                />
            </>

        )
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth
    }
}
//mapDispatchToProps - ниже вместо mapDispatchToProps в connect вторым параметром прокинут объект,
// в котором свойству соответствует не колбек с диспатчем результата вызова экшн криейтора, а сам экшн-криейтор - альтернативный вариант с более короткой записью
// let mapDispatchToProps = (dispatch: (action: usersReducerActionType) => void ) => {
//     return {
//         followUser: (userId: number)=>{dispatch(followSuccessAC(userId))},
//         unfollowUser: (userId: number)=>{dispatch(unfollowSuccessAC(userId))},
//         setUsers: (users: Array<UserType>)=>{dispatch(setUsersAC(users))},
//         setCurrentPage: (currentPage: number)=>{dispatch(setCurrentPageAC(currentPage))},
//         setTotalUsersCount: (totalUsersCount: number)=>{dispatch(setTotalUsersCountAC(totalUsersCount))},
//         changeIsFetchingValue: (isFetchingValue: boolean)=>{dispatch(changeIsFetchingValueAC(isFetchingValue))}
//     }
// }


export const UsersContainer = connect(mapStateToProps, {
    followUser: follow,
    unfollowUser: unfollow,
    setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC,
    setTotalUsersCount: setTotalUsersCountAC,
    changeIsFetchingValue: changeIsFetchingValueAC,
    changeIsFollowingProgress: changeIsFollowingProgressAC,
    getUsersThunkCreator: getUsersThunkCreator
})(UsersClassComponent)