

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
export type profileReducerActionType = AddPostActionType | UpdateNewPostTextActionType | SetUserProfileACType


export type ProfilePageDataType = {
    postsCommentsData: Array<PostCommentType>,
    newPostText: string,
    profile: null | ProfileType
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
    newPostText: '',
    profile: null
}

// Редьюсер - принимает в себя стейт и экшн (объект), если тип экшна совпадает с одним из вариантов внутри редьюсера -
// происходит изменение стейта, далее стейт возвращается. Если в экшне нет подходящего типа для этого редьюсера - стейт возвращается неизменным.
export const profileReducer = (state: ProfilePageDataType = initialState, action: profileReducerActionType) => {
    switch (action.type) {
        case ADD_POST:
            return {...state,
                newPostText: '',
                postsCommentsData: [
                    {
                        id: 5,
                        message: state.newPostText,
                        likesCount: 0
                    },
                    ... state.postsCommentsData,
                ]
                }
        case UPDATE_NEW_POST_TEXT:
           // state.newPostText = action.textAreaSymbol
            return {...state, newPostText: action.textAreaSymbol }
        case SET_USER_PROFILE:
            return {...state,
            profile: {
                ...action.profile
            }}
        default:
            return state
    }
}

//ReturnType принимает функцию и возвращает тип возвращаемого значения, который функция вернула бы при вызове
export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextActionCreator>
export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>

//Action-creator'ы - возвращают объект (экшн), который передается в диспатч. Внутри экшна обязаетельно прописывается type
export const addPostActionCreator = () => {
    return {type: "ADD-POST"} as const
}

export const updateNewPostTextActionCreator = (text:string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        textAreaSymbol: text } as const
}
export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: SET_USER_PROFILE,
        profile } as const
}