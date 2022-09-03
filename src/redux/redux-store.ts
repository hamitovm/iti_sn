import {combineReducers, legacy_createStore as createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";





// Сборка редьюсеров, в объекте в качестве ключа указана часть стейта для соответствующего редьюсера.
// Эта сборка передастся в createStore
let reducers = combineReducers({
    profilePageData: profileReducer,
    messagesPageData: dialogsReducer,
    usersPageData: usersReducer,
    auth: authReducer
})

export type ReducersType = typeof reducers

export type StateType = ReturnType<ReducersType>
//export type StateType = ReturnType<typeof store.getState>

export let store = createStore(reducers)
