import {ActionsType, MessagesPageDataType} from "./store";


const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'
type dialogsReducerActionType = UpdateNewMessageBody | SendMessage

let initialState: MessagesPageDataType = {
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

export const dialogsReducer = (state: MessagesPageDataType = initialState, action: ActionsType) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return  {...state,
                newMessageBody: action.body}
        case SEND_MESSAGE:
            return {...state,
                newMessageBody: '',
                messageArr: [...state.messageArr,
                    {
                        id: state.messageArr.length,
                        message: state.newMessageBody
                    }]}
        default:
            return state
    }
}
export type UpdateNewMessageBody = ReturnType<typeof updateNewMessageBodyCreator>
export type SendMessage = ReturnType<typeof sendMessageCreator>

export const sendMessageCreator = () => {
    return {
        type: 'SEND-MESSAGE',
    } as const
}
export const updateNewMessageBodyCreator = (text:string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-BODY',
        body: text } as const
}