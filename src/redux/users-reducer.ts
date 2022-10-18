import {usersAPI} from "../api/api";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const CHANGE_IS_FETCHING_VALUE = 'CHANGE-IS-FETCHING-VALUE'
const CHANGE_IS_FOLLOWING_PROGRESS = 'CHANGE_IS_FOLLOWING_PROGRESS'
export type usersReducerActionType =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ChangeIsFetchingValueActionType
    | changeIsFollowingProgressActionType
export type UserType = {
    id: number,
    photos: {
        small: string | null,
        large: string | null
    },
    followed: boolean,
    name: string,
    status: string | null,
    location: { city: string, country: string }
}
export type UsersPageDataType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
    followingInProgress: Array<number>
}
//  initialState - начальный стейт
let initialState: UsersPageDataType = {
    users: [
        // {id: 3, photoUrl: 'https://avatars.githubusercontent.com/u/110953?v=4',
        //     followed: false, fullName: 'Addy', status: 'I am a boss', location: {city: 'Madrid', country: 'Spain'}}
    ],
    pageSize: 5,
    totalUsersCount: 20,
    currentPage: 4,
    isFetching: false,
    followingInProgress: []
}

// Редьюсер - принимает в себя стейт и экшн (объект), если тип экшна совпадает с одним из вариантов внутри редьюсера -
// происходит изменение стейта, далее стейт возвращается. Если в экшне нет подходящего типа для этого редьюсера - стейт возвращается неизменным.
export const usersReducer = (state: UsersPageDataType = initialState, action: usersReducerActionType):UsersPageDataType => {
    switch (action.type) {
        case FOLLOW:
            const userToFollow = {...state.users.find(el => el.id === action.userId)}
            if (userToFollow) {
                userToFollow.followed = true
            }
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: true} : el)
            }
        case UNFOLLOW:
            const userToUnfollow = {...state.users.find(el => el.id === action.userId)}
            if (userToUnfollow) {
                userToUnfollow.followed = false
            }
            return {
                ...state,
                users: state.users.map(el => el.id === action.userId ? {...el, followed: false} : el)
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case CHANGE_IS_FETCHING_VALUE:
            return {...state, isFetching: action.isFetchingValue}
        //    В момент нажатия на кнопку подписки - отправляется в экшне true и айди,
        //    айди попадает в массив - значит кнопка польсователя с таким айди будет задизейблена.
        //    После того, как придут данные от сервера - опять задиспатчится экшн, в котором уже будет
        //    false  и айди, айди удалится из массива followingInProgress и кнопка снова станет кликабельной.
        case CHANGE_IS_FOLLOWING_PROGRESS:
            return {...state,
                followingInProgress: action.isFetchingData ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(el => el !== action.userId)
                }
        default:
            return state
    }
}

//ReturnType принимает функцию и возвращает тип возвращаемого значения, который функция вернула бы при вызове
export type FollowActionType = ReturnType<typeof followSuccessAC
    >
export type UnfollowActionType = ReturnType<typeof unfollowSuccessAC
    >
export type SetUsersActionType = ReturnType<typeof setUsersAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCountAC>
export type ChangeIsFetchingValueActionType = ReturnType<typeof changeIsFetchingValueAC>
export type changeIsFollowingProgressActionType = ReturnType<typeof changeIsFollowingProgressAC>

//Action-creator'ы - возвращают объект (экшн), который передается в диспатч. Внутри экшна обязаетельно прописывается type
export const followSuccessAC
    = (userId: number) => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}

export const unfollowSuccessAC
    = (userId: number) => {
    return {
        type: UNFOLLOW,
        userId: userId
    } as const
}

export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users
    } as const
}
export const setCurrentPageAC = (pageNumber: number) => {
    return {
        type: SET_CURRENT_PAGE,
        pageNumber
    } as const
}
export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    } as const
}
export const changeIsFetchingValueAC = (isFetchingValue: boolean) => {
    return {
        type: CHANGE_IS_FETCHING_VALUE,
        isFetchingValue
    } as const
}

export const changeIsFollowingProgressAC = (isFetchingData: boolean, userId: number) => {
    return {
        type: CHANGE_IS_FOLLOWING_PROGRESS,
        isFetchingData,
        userId
    } as const
}

//thunk - функция, которая внутри себя диспатчит другие экшны, это функция, которая оборачивает выражение, чтобы отложить его вычисление.
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {

    return (dispatch: Dispatch<usersReducerActionType>) => {
        //changeIsFetchingValue ставится true в момент начала загрузки данных и перед сетом возвращается false
        dispatch(changeIsFetchingValueAC(true))
        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
            dispatch(changeIsFetchingValueAC(false))
            dispatch(setUsersAC(data.items))
            dispatch(setTotalUsersCountAC(data.totalCount))
        })
    }
}

export const follow = (userId: number) => {

    return (dispatch: Dispatch<usersReducerActionType>) => {
        // Кнопка задизейблится
        dispatch(changeIsFollowingProgressAC(true, userId))
        usersAPI.follow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccessAC(userId))
                }
                // Кнопка раздизейблится
                dispatch(changeIsFollowingProgressAC(false, userId))
            })
    }
}

export const unfollow = (userId: number) => {

    return (dispatch: Dispatch<usersReducerActionType>) => {
        // Кнопка задизейблится
        dispatch(changeIsFollowingProgressAC(true, userId))
        usersAPI.unfollow(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowSuccessAC(userId))
                }
                // Кнопка раздизейблится
                dispatch(changeIsFollowingProgressAC(false, userId))
            })
    }
}