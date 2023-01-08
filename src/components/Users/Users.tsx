import {UserType} from "../../redux/users-reducer";
import mod from './Users.module.css'
import default_user_photo from '../../assets/images/e_photo.png';
import React from "react";
import {Navigate, NavLink} from "react-router-dom";
import axios from "axios";
import {usersAPI} from "../../api/api";
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "./User";

type UsersPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    onPageNumberClickHandler: (pageNumber: number) => void
    isFetching: boolean
    followingInProgress: Array<number>
    changeIsFollowingProgress: (isFetchingData: boolean, userId: number) => void

}

export const Users = (props: UsersPropsType) => {

    return (
        <div>
            <Pagination currentPage={props.currentPage}
                        pageSize={props.pageSize}
                        onPageNumberClickHandler={props.onPageNumberClickHandler}
                        totalUsersCount={props.totalUsersCount}/>
            {
                props.users.map(el => <User user={el}
                                            followUser={props.followUser}
                                            unfollowUser={props.unfollowUser}
                                            followingInProgress={props.followingInProgress}/>)
            }
        </div>
    )
}