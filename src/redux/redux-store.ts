import {combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";

export type ReducersType = typeof reducers

export type StateType = ReturnType<ReducersType>
//export type StateType = ReturnType<typeof store.getState>

// Сборка редьюсеров, в объекте в качестве ключа указана часть стейта для соответствующего редьюсера.
// Эта сборка передастся в createStore
let reducers = combineReducers({
    profilePageData: profileReducer,
    messagesPageData: dialogsReducer,
    usersPageData: usersReducer
})

export let store = createStore<StateType, any, any, any>(reducers)
