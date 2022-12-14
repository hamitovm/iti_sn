import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


// Сборка редьюсеров, в объекте в качестве ключа указана часть стейта для соответствующего редьюсера.
// Эта сборка передастся в createStore
let reducers = combineReducers({
    profilePageData: profileReducer,
    messagesPageData: dialogsReducer,
    usersPageData: usersReducer,
    auth: authReducer,
    app: appReducer
})

export type ReducersType = typeof reducers

export type StateType = ReturnType<ReducersType>
//export type StateType = ReturnType<typeof store.getState>

//applyMiddleware(thunk) - доп. параметр, который в данном случае добавляется для работы thunk'ов
//applyMiddleware не более чем переопределяет метод dispatch, добавляя перед (или после) обновлением состояния какую-то пользовательскую логику.
//thunk импортирован из "redux-thunk", поэтому нужно в терминале прописать yarn add redux-thunk, чтобы работало
export let store = legacy_createStore(reducers, applyMiddleware(thunk))
