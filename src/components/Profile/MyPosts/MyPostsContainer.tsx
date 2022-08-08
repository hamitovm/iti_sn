import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {StoreContext} from "../../../StoreContext";
import {ActionsType} from "../../../redux/store";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {Dialogs} from "../../Dialogs/Dialogs";
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
                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }
                const onTextareaChangeHandler = (text: string) => {
                    store.dispatch(updateNewPostTextActionCreator(text))
                }
                return (
                    <MyPosts postsCommentsData={state.profilePageData.postsCommentsData}
                             newPostTextAreaValue={state.profilePageData.newPostText}
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
        newPostTextAreaValue: state.profilePageData.newPostText
    }
}

let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        onTextareaChangeHandler: (text: string) => {
            dispatch(updateNewPostTextActionCreator(text))        }
    }
}

export const SuperMyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)