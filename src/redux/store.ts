import {dialogsReducer, SendMessage, UpdateNewMessageBody} from "./dialogs-reducer";
import {AddPostActionType, profileReducer, UpdateNewPostTextActionType} from "./profile-reducer";

export type RootStateType = {
    profilePageData: ProfilePageDataType,
    messagesPageData: MessagesPageDataType
}

export type ProfilePageDataType = {
    postsCommentsData: Array<PostCommentType>,
    newPostText: string
}

export type PostCommentType = {
    id: number,
    message: string,
    likesCount: number
}

export type MessagesPageDataType = {
    dialogs: Array<DialogType>,
    messageArr: Array<EachMessagePropsType>,
    newMessageBody: string
}

export type DialogType = {
    name: string
    id: string
}

export type EachMessagePropsType = {
    id: number
    message: string
}
export type StoreType = {
    // Нижнее подчеркивание - условная договоренность о том, чтобы не пользоваться данным методом извне
    _state: RootStateType,
    _callSubscriber: () => void,
    updateNewPostText: (textAreaSymbol: string) => void,
    addPost: () => void,
    subscribe: (observer: () => void) => void,
    getState: () => RootStateType,
    dispatch: (action: ActionsType) => void
}

//Action-types
export type ActionsType = AddPostActionType | UpdateNewPostTextActionType | UpdateNewMessageBody | SendMessage

export const store: StoreType = {
    // Нижнее подчеркивание - условная договоренность, означает, что не нужно обращаться к _state извне напрямую
    _state: {
        profilePageData: {
            postsCommentsData: [
                {id: 1, message: 'Hi! ', likesCount: 12},
                {id: 2, message: 'How are you?', likesCount: 2},
                {id: 3, message: 'Ok!!!', likesCount: 9}
            ],
            newPostText: ''
        },
        messagesPageData: {
            dialogs: [
                {id: '1', name: 'Dimych'},
                {id: '2', name: 'Andrew'},
                {id: '3', name: 'Sveta'},
                {id: '4', name: 'Sasha'},
                {id: '5', name: 'Viktor'},
                {id: '6', name: 'Valera'}
            ],
            messageArr: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Ok'},
                {id: 4, message: 'Ok'},
                {id: 5, message: 'Ok'}
            ],
            newMessageBody: '',
        }
    },
    //В _callSubscriber привязана функция ререндера страницы, чтобы вызывать ее при изменении стейта
    _callSubscriber() {
    },
    //В subscribe в качестве аргумента приходит функция ререндера из app.tsx
    subscribe(observer) {
        this._callSubscriber = observer
    },
    updateNewPostText(textAreaSymbol) {
        this._state.profilePageData.newPostText = textAreaSymbol
        this._callSubscriber()
    },
    addPost() {
        let newPost = {id: 5, message: this._state.profilePageData.newPostText, likesCount: 0}
        this._state.profilePageData.postsCommentsData.unshift(newPost)
        this._state.profilePageData.newPostText = ''
        this._callSubscriber()
    },
    getState() {
        return this._state
    },
    //Диспатч внутри компоненты принимает экшн (объект, в котором есть как минимум type), внутри диспатча есть редьюсеры, которые принимают стейт (или его часть) и экшн,
    //если тип экшна соответствует редьюсеру - стейт меняется и перезаписывается, так диспатч пробегается по всем редьюсерам и в конце вызываетс перерисовку.
    dispatch(action) {
        this._state.profilePageData = profileReducer(this._state.profilePageData, action)
        this._state.messagesPageData = dialogsReducer( this._state.messagesPageData, action)
        this._callSubscriber()
    }
}







// window.store = store