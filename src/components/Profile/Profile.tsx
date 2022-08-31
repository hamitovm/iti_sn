import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer, SuperMyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerPropsType} from "./ProfileContainer";
import {Preloader} from "../common/preloader";
import {useLocation, useParams} from "react-router-dom";

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