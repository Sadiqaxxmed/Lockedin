import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeletePost } from "../../../store/post";

import './DeletePost.css'
import { useModal } from "../../../context/Modal";


const DeletePost = (post) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const userId = useSelector(state => state.session.user.id)

    const deletedPost = post.post.post
    const postId = post.post.id

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeletePost({postId, userId}))
        closeModal()
    }

    return(
        <div className='DP-Main-Wrapper' >
            <h1 className="DP-Title">Are you sure you want to delete this post?</h1>
            <h1 className="DP-Post">{deletedPost}</h1>
            <div className="DP-Buttons">
                <div className="DP-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="DP-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeletePost
