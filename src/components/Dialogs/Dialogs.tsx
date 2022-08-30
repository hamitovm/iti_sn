import React, {ChangeEvent} from 'react';
import {DialogItem} from "./DialogItem/DialogItem";

import mod from './Dialogs.module.css'
import {EachMessagePropsType, MessagesPageDataType} from "../../redux/dialogs-reducer";
// import {StateType} from "../../redux/redux-store";


 type DialogsPropsType = {
     messagesPageData: MessagesPageDataType
     sendMessage: () => void
     updateNewMessageBody: (text: string) => void
 }
export const Dialogs = (props:DialogsPropsType) => {

    const dialogItems = props.messagesPageData.dialogs.map((el, index) => {
        return (
            <DialogItem key={index} name={el.name} id={el.id}/>
        )
    })

    let messageElements = props.messagesPageData.messageArr.map((el: EachMessagePropsType, index: number) => <div key={index}  className={mod.message}>{el.message}</div>)

    const onTextAreaChengeHandler = (e:ChangeEvent<HTMLTextAreaElement>) => {
        if (e.currentTarget) {
            let text = e.currentTarget.value
            props.updateNewMessageBody(text)
        }
    }

    return (
        <div className={mod.dialogs}>
            <div className={mod.dialogsItems}>
                {dialogItems}
            </div>
            <div className={mod.messageArr}>
                {messageElements}
                <div>
                <textarea
                    placeholder='Enter your message'
                    value={props.messagesPageData.newMessageBody}
                    onChange={onTextAreaChengeHandler}
                    cols={60}
                    rows={2}/>
                    <div>
                        <button onClick={props.sendMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}