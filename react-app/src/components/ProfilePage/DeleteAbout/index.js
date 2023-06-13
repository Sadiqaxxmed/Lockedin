import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteAbout } from "../../../store/session";

import './DeleteAbout.css'
import { useModal } from "../../../context/Modal";


const DeletePost = (currentUser) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const userId = useSelector(state => state.session.user?.id)

    const deletedAbout = currentUser.user.about

    // const deletedPost = post.post.post
    // const postId = post.post.id

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteAbout({userId}))
        closeModal()
    }

    return(
        <div className='DP-Main-Wrapper'>
            <h1 className="DP-Title">Are you sure you want to delete your about section?</h1>
            <h1 className="DP-Post">{deletedAbout}</h1>
            <div className="DP-Buttons">
                <div className="DP-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="DP-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeletePost
