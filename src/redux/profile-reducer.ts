import {Dispatch} from "redux";
import {profileAPI} from "../api/api";


const ADD_POST = 'ADD-POST'
const DELETE_POST = 'DELETE-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_USER_STATUS = 'SET-USER-STATUS'
export type profileReducerActionType = AddPostActionType
    | UpdateNewPostTextActionType
    | SetUserProfileACType
    | SetUserStatusACType
    | DeletePostActionType


export type ProfilePageDataType = {
    postsCommentsData: Array<PostCommentType>,
    profile: null | ProfileType
    status: string
}

export type PostCommentType = {
    id: number,
    message: string,
    likesCount: number
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string | null,
        large: string | null
    }
}


//  initialState - начальный стейт
let initialState: ProfilePageDataType = {
    postsCommentsData: [
        {id: 1, message: 'Hi! ', likesCount: 12},
        {id: 2, message: 'How are you?', likesCount: 2},
        {id: 3, message: 'Ok!!!', likesCount: 9}
    ],
    profile: null,
    status: ''
}

// Редьюсер - принимает в себя стейт и экшн (объект),
// если тип экшна совпадает с одним из вариантов внутри редьюсера -
// происходит изменение стейта, далее стейт возвращается.
// Если в экшне нет подходящего типа для этого редьюсера -
// стейт возвращается неизменным.
export const profileReducer = (state: ProfilePageDataType = initialState,
                               action: profileReducerActionType) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsCommentsData: [
                    {
                        id: 5,
                        message: action.newPostText,
                        likesCount: 0
                    },
                    ...state.postsCommentsData,
                ]
            }
        case DELETE_POST:
            const postToDelete = state.postsCommentsData.find(el => el.id === action.postId)
            return {
                ...state,
                postsCommentsData: state.postsCommentsData.filter(el => el.id !== action.postId)
            }
        case UPDATE_NEW_POST_TEXT:
            // state.newPostText = action.textAreaSymbol
            return {...state, newPostText: action.textAreaSymbol}
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: {
                    ...action.profile
                }
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

//ReturnType принимает функцию и возвращает тип возвращаемого значения,
// который функция вернула бы при вызове
export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type DeletePostActionType = ReturnType<typeof deletePostActionCreator>
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextActionCreator>
export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export type SetUserStatusACType = ReturnType<typeof setUserStatusAC>

//Action-creator'ы - возвращают объект (экшн), который передается в диспатч.
// Внутри экшна обязаетельно прописывается type
export const addPostActionCreator = (newPostText: string) => {
    return {
        type: "ADD-POST",
        newPostText
    } as const
}

export const deletePostActionCreator = (postId: number) => {
    return {
        type: "DELETE-POST",
        postId
    } as const
}

export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        textAreaSymbol: text
    } as const
}
export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile
    } as const
}

export const setUserStatusAC = (status: string) => {
    return {
        type: SET_USER_STATUS,
        status: status
    } as const
}

export const getUserProfile = (userId: string) => {
    return async (dispatch: Dispatch<profileReducerActionType>) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(response.data))

    }
}

export const getUserStatus = (userId: string) => {
    return  async (dispatch: Dispatch<profileReducerActionType>) => {
        let response = await profileAPI.getStatus(userId)
                dispatch(setUserStatusAC(response.data))
    }
}

export const updateUserStatus = (status: string) => {
    return (dispatch: Dispatch<profileReducerActionType>) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatusAC(status))
                }
            })
    }
}
