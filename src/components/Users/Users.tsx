import {UserType} from "../../redux/users-reducer";
import mod from './Users.module.css'
import default_user_photo from '../../assets/images/e_photo.png';
import React from "react";

type UsersPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    followUser: (id: number) => void
    unfollowUser: (id: number) => void
    onPageNumberClickHandler: (pageNumber: number) => void
    isFetching: boolean

}

export const Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [1, props.currentPage-1, props.currentPage, props.currentPage+1, pagesCount]
    //Условия для отображения корректного набора страниц
    if (props.currentPage < 4) {
        pages = [1, 2, 3, 4, pagesCount]
    }
    if (props.currentPage > pagesCount - 2) {
        pages = [1, pagesCount-3, pagesCount-2, pagesCount-1, pagesCount]
    }

    return (
        <div>
            <div className={mod.page__numbers}>
                {
                    pages.map(el => {
                            return (
                                <span onClick={() => props.onPageNumberClickHandler(el)}
                                      className={props.currentPage === el ? mod.selected__page : mod.page__numbers}>
                               {el === pagesCount && props.currentPage < pagesCount - 2 && ' ... '}
                                    {el}
                                    {el === 1 && props.currentPage > 3 && ' ... '}
                           </span>)
                        }
                    )}
            </div>
            {
                props.users.map(el => (
                    <div key={el.id}>
                        <span>
                            <div>
                                <img className={mod.user__avatar} src={el.photos.small !== null ? el.photos.small : default_user_photo } alt=""/>
                            </div>
                            <div>
                                {el.followed ?
                                    <button onClick={()=>props.unfollowUser(el.id)}>Unfollow</button> :
                                    <button onClick={()=>props.followUser(el.id)}>Follow</button>}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>
                                    {el.name}
                                </div>
                                <div>
                                    {el.status}
                                </div>
                            </span>
                            <span>
                                <div>{'el.location.country'}</div>
                                <div>{'el.location.city'}</div>
                            </span>
                        </span>
                    </div>
                ))

            }
        </div>
    )
}