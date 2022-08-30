import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer, SuperMyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileContainerPropsType} from "./ProfileContainer";
import {Preloader} from "../common/preloader";

export type ProfilePostsType = {

}

export const Profile = (props: ProfileContainerPropsType) => {

    return (
        <div>
            <ProfileInfo userProfile={props.userProfile}/>
            <h1>{props.userProfile ? props.userProfile.fullName : 'null'}</h1>
            <SuperMyPostsContainer

            />
        </div>
    )
}