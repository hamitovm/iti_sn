import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {SuperMyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerPropsType} from "./ProfileContainer";

export type ProfilePostsType = {}

export const Profile = (props: ProfileContainerPropsType) => {
    return (
        <div>
            <ProfileInfo userProfile={props.userProfile}/>
            <h1>{props.userProfile && props.userProfile.fullName}</h1>
            <SuperMyPostsContainer

            />
        </div>
    )
}