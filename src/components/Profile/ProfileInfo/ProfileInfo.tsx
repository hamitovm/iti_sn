import React from "react";
import mod from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

export type ProfileInfoPropsType = {
    userProfile: null | ProfileType
}


export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (<div>
            <div className={mod.content_background}>
            </div>
            <img src={props.userProfile.photos.large ? props.userProfile.photos.large : ''} alt=""/>
            <ProfileStatus status={'Hello'}/>
        </div>

    )
}