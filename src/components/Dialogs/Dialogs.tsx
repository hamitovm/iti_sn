import React from 'react';
import {DialogItem} from "./DialogItem/DialogItem";

import mod from './Dialogs.module.css'
import {EachMessagePropsType, MessagesPageDataType} from "../../redux/dialogs-reducer";
import {Formik} from "formik";
import * as Yup from "yup";
// import {StateType} from "../../redux/redux-store";


export type DialogsPropsType = {
    messagesPageData: MessagesPageDataType
    isAuth: boolean
    sendMessage: (newMessageBody: string) => void
}
export const Dialogs = (props: DialogsPropsType) => {
    // console.log(props.isAuth)

    const dialogItems = props.messagesPageData.dialogs.map((el, index) => {
        return (
            <DialogItem key={index} name={el.name} id={el.id}/>
        )
    })

    let messageElements = props.messagesPageData.messageArr.map((el: EachMessagePropsType, index: number) => <div
        key={index} className={mod.message}>{el.message}</div>)


    // if (!props.isAuth) return <Navigate to={'/login'} />

    return (
        <div className={mod.dialogs}>
            <div className={mod.dialogsItems}>
                {dialogItems}
            </div>
            <div className={mod.messageArr}>
                {messageElements}
                {/*<div>*/}
                {/*    <textarea*/}
                {/*    placeholder='Enter your message'*/}
                {/*    value={props.messagesPageData.newMessageBody}*/}
                {/*    onChange={onTextAreaChengeHandler}*/}
                {/*    cols={60}*/}
                {/*    rows={2}/>*/}
                {/*    <div>*/}
                {/*        <button onClick={props.sendMessage}>Send message</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Formik initialValues={{newMessage: ''}}
                        validationSchema={Yup.object({
                            newMessage: Yup.string()
                                .required('Required')
                        })}
                        onSubmit={(values, onSubmitProps) => {
                            props.sendMessage(values.newMessage)
                            onSubmitProps.resetForm()
                        }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                            <textarea
                                placeholder='Enter your message'
                                id="newMessage" cols={60} rows={2}
                                {...formik.getFieldProps('newMessage')}
                            />
                            </div>
                            <button type="submit">Send message formik</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}