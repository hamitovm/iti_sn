import {Dispatch} from "redux";
import {authAPI} from "../api/api";

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
                isAuth: true
            }

        default:
            return state
    }
}
export type setAuthUserDataActionType = ReturnType<typeof setAuthUserDataAC>

export const setAuthUserDataAC = (userId: number,
                                  email: string,
                                  login: string) => {
    return {
        type: SET_AUTH_USER_DATA,
        data: {
            id: userId,
            email,
            login
        }
    } as const
}

export const getAuthUserData = () => (dispatch: Dispatch<authReducerActionType>) => {
        authAPI.me()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {email, id, login} = response.data.data
                    // const userId = response.data.data.id
                    // const email = response.data.data.email
                    // const login = response.data.data.login
                    dispatch(setAuthUserDataAC(id, email, login))
                }
            })
    }

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<authReducerActionType>) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                getAuthUserData()
            }
        })
}

