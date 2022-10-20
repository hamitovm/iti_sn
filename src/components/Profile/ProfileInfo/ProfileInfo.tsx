import React from "react";
import mod from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";

export type ProfileInfoPropsType = {
    userProfile: null | ProfileType
    status: string
    updateUserStatus: (status: string)=> void
}


export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.userProfile) {
        return <Preloader/>
    }
    return (<div>
            <div className={mod.content_background}>
            </div>
            <img src={props.userProfile.photos.large ? props.userProfile.photos.large : ''} alt=""/>
            <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>

    )
}