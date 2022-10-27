import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {ActionsType, StoreContext} from "../../../StoreContext";
import {connect} from "react-redux";
import {StateType} from "../../../redux/redux-store";

type MyPostsContainerProps = {
    // store: StoreType
    // postsCommentsData: Array<PostCommentType>
    // newPostTextAreaValue: string
    // dispatch: (action: ActionsType) => void
}

export const MyPostsContainer = (props: MyPostsContainerProps) => {
    return (
        <StoreContext.Consumer>
            {store => {
                let state = store.getState()
                const addPost = (newPostText: string) => {
                    store.dispatch(addPostActionCreator(newPostText))
                }
                const onTextareaChangeHandler = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }
                return (
                    <MyPosts postsCommentsData={state.profilePageData.postsCommentsData}
                             onTextareaChangeHandler={onTextareaChangeHandler}
                             addPost={addPost}/>
                )
            }}
        </StoreContext.Consumer>

    )
}


let mapStateToProps = (state: StateType) => {
    return {
        postsCommentsData: state.profilePageData.postsCommentsData,
    }
}

let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        },
        onTextareaChangeHandler: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))        }
    }
}

export const SuperMyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)