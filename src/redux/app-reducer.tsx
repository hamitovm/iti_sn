import {ThunkDispatch} from "redux-thunk";
import {StateType} from "./redux-store";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


type appReducerActionType = setInitializedActionType


export type appInitializationStateType = {
    initialized: boolean
}

let initialState: appInitializationStateType = {
    initialized: false
}

export const appReducer = (state: appInitializationStateType = initialState, action: appReducerActionType): appInitializationStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}
export type setInitializedActionType = ReturnType<typeof setInitializedSuccessAC>


export const setInitializedSuccessAC = () => ({
    type: INITIALIZED_SUCCESS
})

export const initializeApp = () => (dispatch: ThunkDispatch<StateType, any, any>) => {
    dispatch(getAuthUserData())
        .then(() => {
            console.log('got it')
            dispatch(setInitializedSuccessAC())
        })

}
