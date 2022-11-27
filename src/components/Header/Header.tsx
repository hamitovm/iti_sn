import React from "react";
import mod from './Header.module.css'
import {NavLink} from "react-router-dom";
import {HeaderContainerPropsType} from "./HeaderContainer";

export const Header = (props: HeaderContainerPropsType) => {
    // if (!props.authUserData.isAuth) {
    //     return <Navigate to={'/login'}/>
    // }
    const onLogoutClickHandler = () => {
        props.logout()
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // useEffect(() => {
    //     if (props.authUserData.isAuth) {
    //         props.getAuthUserData()
    //     }
    // }, [props.authUserData.isAuth])
    return (
        <header className={mod.header}>
            <img
                src="https://crimeadigital.ru/wp-content/uploads/tilda/1053879/pages/12196033/tild3837-3833-4837-b832-333430306334__1200px-react-iconsvg.png"
                alt=""/>
            <div className={mod.loginBlock}>
                {props.authUserData.isAuth ?
                    <button onClick={onLogoutClickHandler}>Logout</button>
                    :
                    <NavLink to="/login" className={(mode) => mode.isActive ? mod.active : mod.item}>
                        Login
                    </NavLink>
                }


                {props.authUserData.isAuth &&
                    <div>{props.authUserData.login + ' - login '}{props.authUserData.id + ' - id '}{props.authUserData.email + ' - email'}</div>}

            </div>
        </header>
    )
}