import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer, SuperMyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfilePostsType = {
    // store: StoreType
}

export const Profile = (props: ProfilePostsType) => {
    return (
        <div>
            <ProfileInfo/>
            <SuperMyPostsContainer
                // store={props.store}
            />
        </div>
    )
}