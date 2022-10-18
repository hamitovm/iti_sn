import React from 'react';
import {Dialogs, DialogsPropsType} from "./Dialogs";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs-reducer";
import {ActionsType, StoreContext} from "../../StoreContext";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {ProfileClassComponent} from "../Profile/ProfileContainer";
import {Navigate} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";



type PropsType = {
    // store: StoreType
    // messagesPageData: MessagesPageDataType
    // dispatch: (action: ActionsType) => void
}
// export const DialogsContainer = (props: PropsType) => {
//     return (
//         <StoreContext.Consumer>
//             {store => {
//                 const updateNewMessageBody = (text: string) => {
//                     store.dispatch(updateNewMessageBodyCreator(text))
//                 }
//                 const sendMessageClick = () => {
//                     store.dispatch(sendMessageCreator())
//                 }
//                 return (
//                     <Dialogs messagesPageData={store.getState().messagesPageData}
//                              sendMessage={sendMessageClick}
//                              updateNewMessageBody={updateNewMessageBody}/>
//                 )
//             }}
//         </StoreContext.Consumer>
//     )
// }


// mapStateToProps (общепринятое название) - принимает стейт, возвращает объект со стейтовыми пропсами для компоненты
 let mapStateToProps = (state: StateType) => {
    return {
        messagesPageData: state.messagesPageData

    }
 }
// mapDispatchToProps (общепринятое название) - принимает диспатч, возвращает объект с колбековыми пропсами для компоненты
let mapDispatchToProps = (dispatch: (action: ActionsType) => void ) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator())
        },
        updateNewMessageBody: (text: string) => {
            dispatch(updateNewMessageBodyCreator(text))
        }
    }
}
let AuthRedirectDialogsComponent = (props: DialogsPropsType) => {
    // if (!props.isAuth) return <Navigate to={'/login'} />
    return <Dialogs {...props}/>
}

// Контейнерная компонента через react-redux создается при помощи двойного вызова ф-ции connect, в перву передаются
// колбеки mapStateToProps и mapDispatchToProps (по ним объяснение выше), во вторую передается компонента, над которой
// создается контейнер.
// ВАЖНО: для того, чтобы сделать состояние Redux доступным для всех компонентов-контейнеров App в его иерархии,
// в index.tsx он был обернут в <Provider store={store}>    </Provider
// export const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export const SuperDialogsContainer = withAuthRedirect(connect(mapStateToProps, mapDispatchToProps)(AuthRedirectDialogsComponent))

