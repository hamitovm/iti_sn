import React from "react";
import mod from './Navbar.module.css'
import {Link, NavLink} from "react-router-dom";



export const Navbar = () => {
    return (
        <nav className={mod.nav}>
            <div>
                <NavLink to="/profile" className={(mode) => mode.isActive ? mod.active : mod.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs"  className={(mode) => mode.isActive ? mod.active : mod.item}>Messages</NavLink>
            </div>
            <div>
                <NavLink to="/news" className={(mode) => mode.isActive ? mod.active : mod.item} >News</NavLink>
            </div>
            <div className={mod.item}>
                <NavLink to="/music" className={(mode) => mode.isActive ? mod.active : mod.item}>Music</NavLink>
            </div>
            <div className={mod.item}>
                <NavLink to="/settings" className={(mode) => mode.isActive ? mod.active : mod.item}>Settings</NavLink>
            </div>
        </nav>
    )
}