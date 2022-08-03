import React, {ChangeEvent} from 'react';
import {DialogItem} from "./DialogItem/DialogItem";
import {ActionsType, DialogType, EachMessagePropsType, MessagesPageDataType, StoreType} from "../../redux/store";
import {Message} from "./Message/Message";
import mod from './Dialogs.module.css'
import {StateType} from "../../redux/redux-store";


 type DialogsPropsType = {
     state: StateType
     // dialogsData: Array<DialogType>
     // messageArr: Array<EachMessagePropsType>
     // newMessageBody: string
     sendMessage: () => void
     updateNewMessageBody: (text: string) => void
 }
export const Dialogs = (props:DialogsPropsType) => {

    const dialogItems = props.state.messagesPageData.dialogs.map(el => {
        return (
            <DialogItem name={el.name} id={el.id}/>
        )
    })

    let messageElements = props.state.messagesPageData.messageArr.map((el: EachMessagePropsType, index: number) => <div className={mod.message}>{el.message}</div>)

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
                    // ref={newMessageElement}
                    value={props.state.messagesPageData.newMessageBody}
                    onChange={onTextAreaChengeHandler}
                    cols={60}
                    rows={2}></textarea>
                    <div>
                        <button onClick={props.sendMessage}>Send message</button>
                    </div>
                </div>
            </div>
        </div>
    )
}