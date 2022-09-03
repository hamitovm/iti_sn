import React from "react";
import mod from './Header.module.css'
import {NavLink} from "react-router-dom";
import {HeaderContainerPropsType} from "./HeaderContainer";

export const Header = (props:HeaderContainerPropsType) => {
    console.log(props.authUserData.login)
    return (
        <header className={mod.header}>
            <img
                src="https://crimeadigital.ru/wp-content/uploads/tilda/1053879/pages/12196033/tild3837-3833-4837-b832-333430306334__1200px-react-iconsvg.png"
                alt=""/>
            <div className={mod.loginBlock}>
                <NavLink to="/login" className={(mode) => mode.isActive ? mod.active : mod.item}>{
                    props.authUserData.isAuth ? props.authUserData.login : 'Login'
                }</NavLink>
                <div>{props.authUserData.login + ' - login '}{props.authUserData.id + ' - id '}{props.authUserData.email + ' - email'}</div>
                <div></div>
                <div></div>
            </div>
        </header>
    )
}