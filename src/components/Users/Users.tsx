import {UserType} from "../../redux/users-reducer";
import mod from './Users.module.css'
import default_user_photo from '../../assets/images/e_photo.png';
import React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

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
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount]
    //Условия для отображения корректного набора страниц
    if (props.currentPage < 4) {
        pages = [1, 2, 3, 4, pagesCount]
    }
    if (props.currentPage > pagesCount - 2) {
        pages = [1, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount]
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
                                <NavLink to={"/profile/" + el.id}>
                                    <img className={mod.user__avatar}
                                         src={el.photos.small !== null ? el.photos.small : default_user_photo} alt=""/>
                                </NavLink>

                            </div>
                            <div>
                                {el.followed ?
                                    <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                        // Кнопка задизейблится
                                        props.changeIsFollowingProgress(true, el.id)
                                        //в delete, put - запросах объект с withCredentials пишется третим параметом
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`,
                                            {
                                                withCredentials: true,
                                                //    headers - API key
                                                headers: {
                                                    'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
                                                }
                                            }).then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollowUser(el.id)
                                            }
                                            // Кнопка раздизейблится
                                            props.changeIsFollowingProgress(false,el.id)
                                        })
                                        // props.unfollowUser(el.id)
                                    }}>Unfollow</button> :
                                    <button disabled={props.followingInProgress.some(id => id === el.id)} onClick={() => {
                                        props.changeIsFollowingProgress(true, el.id)
                                        //в post, get - запросах объект с withCredentials пишется вторым параметом
                                        //Как указано в спецификации www.w3.org/TR/cors/#omit-credentials-flag,
                                        // withCredentials позволяет нам использовать в запросе к серверу user-credentials,
                                        // т.е. куки, аутентификационные данные и клиентские SSL-сертификаты.
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${el.id}`,
                                            {},
                                            {
                                                withCredentials: true,
                                                //    headers - API key - ключ доступа
                                                headers: {
                                                    'API-KEY': '66098f7b-dc56-48ee-92aa-fa502bfcfe22'
                                                }
                                            }).then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.followUser(el.id)
                                            }
                                            props.changeIsFollowingProgress(false,el.id)

                                        })
                                        // props.followUser(el.id)
                                    }}>Follow</button>}
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