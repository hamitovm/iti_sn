import React from "react";
import {ProfilePageDataType, profileReducerActionType} from "./redux/profile-reducer";
import {dialogsReducerActionType, MessagesPageDataType} from "./redux/dialogs-reducer";
import {usersReducerActionType} from "./redux/users-reducer";

export type ActionsType = profileReducerActionType | dialogsReducerActionType | usersReducerActionType
export type RootStateType = {
    profilePageData: ProfilePageDataType,
    messagesPageData: MessagesPageDataType
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

export const StoreContext = React.createContext({} as StoreType)

export type ProviderType = {
    store: StoreType,
    children: any
}

export const Provider = (props: ProviderType) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    )
}