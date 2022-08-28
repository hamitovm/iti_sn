const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const CHANGE_IS_FETCHING_VALUE = 'CHANGE-IS-FETCHING-VALUE'
export type usersReducerActionType =
    FollowActionType
    | UnfollowActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ChangeIsFetchingValueActionType
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
    isFetching: false
}

// Редьюсер - принимает в себя стейт и экшн (объект), если тип экшна совпадает с одним из вариантов внутри редьюсера -
// происходит изменение стейта, далее стейт возвращается. Если в экшне нет подходящего типа для этого редьюсера - стейт возвращается неизменным.
export const usersReducer = (state: UsersPageDataType = initialState, action: usersReducerActionType) => {
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
        default:
            return state
    }
}

//ReturnType принимает функцию и возвращает тип возвращаемого значения, который функция вернула бы при вызове
export type FollowActionType = ReturnType<typeof followAC>
export type UnfollowActionType = ReturnType<typeof unfollowAC>
export type SetUsersActionType = ReturnType<typeof setUsersAC>
export type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCountAC>
export type ChangeIsFetchingValueActionType = ReturnType<typeof changeIsFetchingValueAC>

//Action-creator'ы - возвращают объект (экшн), который передается в диспатч. Внутри экшна обязаетельно прописывается type
export const followAC = (userId: number) => {
    return {
        type: FOLLOW,
        userId: userId
    } as const
}

export const unfollowAC = (userId: number) => {
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