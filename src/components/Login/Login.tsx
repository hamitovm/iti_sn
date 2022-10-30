import * as Yup from 'yup';
import {Formik, FormikProps, useField} from 'formik';
import mod from '../common/Login.module.css'
import React from "react";
import {LoginForm} from "../common/LoginForm";
import {connect} from "react-redux";
import {
    changeIsFetchingValueAC, changeIsFollowingProgressAC,
    follow, getUsersThunkCreator,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollow
} from "../../redux/users-reducer";
import {UsersClassComponent} from "../Users/UsersContainer";
import {login} from "../../redux/auth-reducer";

export type FormValues = {
    login: string
    password: string
}
export type LoginFormPropsType = {

}
export type LoginPropsType = {


}
export const Login = (props: LoginPropsType) => {
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
            ]} rememberCheckbox={true}/>
        </div>
    )
}

const mstp = () => ({})

export const LoginContainer = connect( mstp,{
    login
})(Login)
