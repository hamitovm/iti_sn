import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {ReducersType, StateType} from "./redux-store";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
export type authReducerActionType = setAuthUserDataActionType

export type userAuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
}

let initialState: userAuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

export const authReducer = (state: userAuthStateType = initialState, action: authReducerActionType): userAuthStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }

        default:
            return state
    }
}
export type setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (userId: number | null,
                                  email: string | null,
                                  login: string | null,
                                  isAuth: boolean) => ({
    type: SET_AUTH_USER_DATA,
    data: {
        id: userId,
        email,
        login
    },
    isAuth
})

export const getAuthUserData = () => (dispatch: Dispatch<authReducerActionType>) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    console.log(response.data)
                    let {email, id, login} = response.data.data
                    dispatch(setAuthUserDataAC(id, email, login, true))
                }
            })
    }

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<StateType, any, any>) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                let {email, id, login} = response.data.data
                dispatch(setAuthUserDataAC(id, email, login, true))
                // dispatch(getAuthUserData())
            }
        })
}

export const logout = () => (dispatch: Dispatch<authReducerActionType>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
        })
}