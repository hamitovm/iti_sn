import React, {ChangeEvent, ChangeEventHandler} from 'react';
import mod from '../Dialogs.module.css'
import {
    ActionsType,
    EachMessagePropsType
} from "../../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";

export type MessagePropsType = {
    messages: Array<EachMessagePropsType>
    newMessageBody: string
    sendMessage: () => void
    updateNewMessageBody: (text: string) => void
}

export const Message = (props:MessagePropsType) => {
    let messageElements = props.messages.map((el: EachMessagePropsType, index: number) => <div className={mod.message}>{el.message}</div>)

    const onTextAreaChengeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget) {
            let text = e.currentTarget.value
            props.updateNewMessageBody(text)
        }
    }

    return (
        <div className={mod.messageArr}>
            {messageElements}
            <div>
                <textarea
                          placeholder='Enter your message'
                          // ref={newMessageElement}
                          value={props.newMessageBody}
                          onChange={onTextAreaChengeHandler}
                          cols={60}
                          rows={2}></textarea>
                <div>
                    <button onClick={props.sendMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
}