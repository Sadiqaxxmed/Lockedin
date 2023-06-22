import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeletePost } from "../../../store/post";

import './DeletePost.css'
import { useModal } from "../../../context/Modal";


const DeletePost = (post) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const userId = useSelector(state => state.session.user?.id)

    const deletedPost = post.post.post
    const postId = post.post.id

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeletePost({postId, userId}))
        closeModal()
    }

    return(
        <div className='FD-Post-Main-Wrapper'>
            <h1 className="FD-Delete-Post-Title">Are you sure you want to delete this post?</h1>
            <div className="FD-Post-Delete-Buttons">
                <div className="FD-Post-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="FD-Post-Delete-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeletePost
