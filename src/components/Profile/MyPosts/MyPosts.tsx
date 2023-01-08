import React from "react";
import mod from './MyPosts.module.css'
import {Post} from "./Post/Post";
import {PostCommentType} from "../../../redux/profile-reducer";
import * as Yup from "yup";
import {Formik} from "formik";


type MyPostsProps = {
    postsCommentsData: Array<PostCommentType>
    onTextareaChangeHandler: (text: string) => void
    addPost: (newPostText: string) => void
}

export const MyPosts = (props: MyPostsProps) => {


    let postsElements = props.postsCommentsData.map((el, index) => <Post key={index} message={el.message}
                                                                likesCount={el.likesCount}/>)

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    // const onTextareaChangeHandler = () => {
    //     if (newPostElement.current) {
    //         let text = newPostElement.current.value
    //         props.onTextareaChangeHandler(text)
    //     }
    // }

    return (
        <div className={mod.posts_block}>
            <h3>My posts</h3>
            {/*<div>*/}
            {/*    <textarea*/}
            {/*        ref={newPostElement}*/}
            {/*        name="" id="" cols={70} rows={3}*/}
            {/*        value={props.newPostTextAreaValue}*/}
            {/*        onChange={onTextareaChangeHandler}/>*/}
            {/*    <div>*/}
            {/*        <button onClick={props.addPost}>Add post</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Formik initialValues={{ newPost: ''}}
                    validationSchema={Yup.object({
                        newPost: Yup.string()
                            .required('Required')
                    })}
                    onSubmit={(values, onSubmitProps) => {
                        // props.onTextareaChangeHandler(values.newPost);
                        props.addPost(values.newPost)
                        onSubmitProps.resetForm()
                    }}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <textarea
                                id="newPost" cols={70} rows={3}
                                placeholder={''}
                                {...formik.getFieldProps('newPost')}
                            />
                        </div>
                        <button type="submit">Add post</button>
                    </form>
                )}
            </Formik>
            <div className={mod.posts}>
                {postsElements}
            </div>
        </div>
    )
}