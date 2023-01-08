import React from "react";
import mod from './ProfileInfo.module.css'
import {ProfileType} from "../../../redux/profile-reducer";
import {Preloader} from "../../common/preloader";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {ProfileStatusWithHooks} from "../ProfileStatus/ProfileStatusWithHooks";

export type ProfileInfoPropsType = {
    userProfile: null | ProfileType
    status: string
    updateUserStatus: (status: string)=> void
}


export const ProfileInfo = ({userProfile, status, updateUserStatus, ...props}: ProfileInfoPropsType) => {
    if (!userProfile) {
        return <Preloader/>
    }
    return (<div>
            <div className={mod.content_background}>
            </div>
            <img src={userProfile.photos.large ? userProfile.photos.large : ''} alt=""/>
            <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
        </div>

    )
}