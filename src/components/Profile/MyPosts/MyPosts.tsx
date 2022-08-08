import React from "react";
import mod from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {
    PostCommentType,
} from "../../../redux/store";

type MyPostsProps = {
    postsCommentsData: Array<PostCommentType>
    newPostTextAreaValue: string
    onTextareaChangeHandler: (text: string) => void
    addPost: () => void
}

export const MyPosts = (props: MyPostsProps) => {

    let postsElements = props.postsCommentsData.map((el, index) => <Post key={index} message={el.message}
                                                                likesCount={el.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const onTextareaChangeHandler = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.onTextareaChangeHandler(text)
        }
    }

    return (
        <div className={mod.posts_block}>
            <h3>My posts</h3>
            <div>
                <textarea
                    ref={newPostElement}
                    name="" id="" cols={70} rows={3}
                    value={props.newPostTextAreaValue}
                    onChange={onTextareaChangeHandler}/>
                <div>
                    <button onClick={props.addPost}>Add post</button>
                </div>
            </div>
            <div className={mod.posts}>
                {postsElements}
            </div>
        </div>
    )
}