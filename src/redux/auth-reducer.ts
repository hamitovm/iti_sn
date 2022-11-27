import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {StateType} from "./redux-store";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR'


export type authReducerActionType = setAuthUserDataActionType | setLoginErrorActionType


export type userAuthStateType = {
    id: number | null,
    email: string | null,
    login: string | null
    isAuth: boolean
    loginError: string | null
}

let initialState: userAuthStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    loginError: null
}

export const authReducer = (state: userAuthStateType = initialState, action: authReducerActionType): userAuthStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth,
                loginError: action.loginError
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.loginError
            }
        default:
            return state
    }
}
export type setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>
export type setLoginErrorActionType = {
    type: 'SET_LOGIN_ERROR',
    loginError: string
}

export const setAuthUserDataAC = (userId: number | null,
                                  email: string | null,
                                  login: string | null,
                                  isAuth: boolean,
                                  loginError: string | null) => ({
    type: SET_AUTH_USER_DATA,
    data: {
        id: userId,
        email,
        login
    },
    isAuth,
    loginError
})

export const setLoginErrorAC = (errorMessage: string) => ({
    type: SET_LOGIN_ERROR,
    loginError: errorMessage
})

export const getAuthUserData = () => (dispatch: Dispatch<authReducerActionType>) => {
        return authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {email, id, login} = response.data.data
                    console.log('is Auth from reducer - true')
                    dispatch(setAuthUserDataAC(id, email, login, true, null))
                }
            })
    }

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkDispatch<StateType, any, any>) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                let {email, id, login} = response.data.data
                dispatch(setAuthUserDataAC(id, email, login, true, null))
                // dispatch(getAuthUserData())
            } else {
                dispatch(setLoginErrorAC(response.data.messages))
            }
        })
}

export const logout = () => (dispatch: Dispatch<authReducerActionType>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false, null))
            }
        })
}
