import React from 'react';
import mod from '../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {DialogType} from "../../../redux/dialogs-reducer";


export const DialogItem = (props: DialogType) => {
    return (
        <div className={mod.dialog}>
            <NavLink to={"/dialogs/" + props.id} className={(mode) => mode.isActive ? mod.active : mod.item}>{props.name}</NavLink>
        </div>
    )
}