import React from "react";
import mod from './Post.module.css'

type PostTypeProps = {
    message: string;
    likesCount: number
}

export const Post = (props: PostTypeProps) => {
    return (
        <div className={mod.item}>
            <img className={mod.post__avatar}
                 src="https://avatars.githubusercontent.com/u/977348?v=4" alt=""/>
            {props.message}
            <div><span>Likes: {props.likesCount}</span></div>
        </div>

    )
}