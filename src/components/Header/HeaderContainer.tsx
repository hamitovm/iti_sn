import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {getAuthUserData, logout, userAuthStateType} from "../../redux/auth-reducer";

export type HeaderContainerPropsType = {
    authUserData: userAuthStateType
    getAuthUserData: () => void
    logout: () => void
}

export class HeaderClassComponent extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <>
                <Header {...this.props}/>
            </>
        )
    }
}

let mapStateToProps = (state: StateType) => {
    return {
        authUserData: state.auth
    }
}

export const HeaderContainer = connect(mapStateToProps, {
    getAuthUserData: getAuthUserData,
    logout
})(HeaderClassComponent)