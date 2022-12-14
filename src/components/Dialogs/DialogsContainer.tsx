import React from 'react';
import {Dialogs} from "./Dialogs";
import {sendMessageCreator} from "../../redux/dialogs-reducer";
import {ActionsType} from "../../StoreContext";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";


// type PropsType = {
    // store: StoreType
    // messagesPageData: MessagesPageDataType
    // dispatch: (action: ActionsType) => void
// }
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
        sendMessage: (newMessageBody: string) => {
            dispatch(sendMessageCreator(newMessageBody))
        },
    }
}


// Контейнерная компонента через react-redux создается при помощи двойного вызова ф-ции connect, в перву передаются
// колбеки mapStateToProps и mapDispatchToProps (по ним объяснение выше), во вторую передается компонента, над которой
// создается контейнер.
// ВАЖНО: для того, чтобы сделать состояние Redux доступным для всех компонентов-контейнеров App в его иерархии,
// в index.tsx он был обернут в <Provider store={store}>    </Provider
// export const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)

// export const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
export const SuperDialogsContainer = compose<React.ComponentType>(withAuthRedirect, connect(mapStateToProps, mapDispatchToProps),)(Dialogs)

