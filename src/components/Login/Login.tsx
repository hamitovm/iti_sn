import React from "react";
import {LoginForm} from "../common/LoginForm";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {StateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";

export type FormValues = {
    login: string
    password: string
}

export type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
    loginError: string | null
}

export const Login = (props: LoginPropsType) => {
    console.log(props.isAuth, ' - is Auth from login')
    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm  inputsProps={[
                {label: 'Login',
                    id: 'login',
                    helpText: "Must be 8-20 characters and cannot contain special characters.",
                    type: 'text'},
                {label: 'Password',
                    id: 'password',
                    helpText: "Must be 8-20 characters and cannot contain special characters.",
                    type: 'password'},
            ]} rememberCheckbox={true} onSubmitClick={props.login} loginError={props.loginError}/>
        </div>
    )
}

type MapStateToPropsType = {
    isAuth: boolean
    loginError: string | null
}

let mapStateToProps = (state: StateType):MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        loginError: state.auth.loginError
    }
}

export const LoginContainer = connect( mapStateToProps,{
    login
})(Login)
