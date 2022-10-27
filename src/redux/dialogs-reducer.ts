


const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'
export type dialogsReducerActionType = SendMessage

export type MessagesPageDataType = {
    dialogs: Array<DialogType>,
    messageArr: Array<EachMessagePropsType>,
}

export type DialogType = {
    name: string
    id: string
}

export type EachMessagePropsType = {
    id: number
    message: string
}

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
    ]
}

export const dialogsReducer = (state: MessagesPageDataType = initialState, action: dialogsReducerActionType):MessagesPageDataType => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {...state,
                messageArr: [...state.messageArr,
                    {
                        id: state.messageArr.length,
                        message: action.newMessageBody
                    }]}
        default:
            return state
    }
}
export type SendMessage = ReturnType<typeof sendMessageCreator>

export const sendMessageCreator = (newMessageBody: string) => {
    return {
        type: 'SEND-MESSAGE',
        newMessageBody
    } as const
}