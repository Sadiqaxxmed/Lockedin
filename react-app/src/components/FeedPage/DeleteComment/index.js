import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteComment } from "../../../store/comment";

import { useModal } from "../../../context/Modal";


const DeleteComment = ({comment}) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const userId = useSelector(state => state.session.user?.id)

    const deletedComment = comment.comment
    const commentId = comment.id



    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteComment({commentId, userId}))
        closeModal()
    }

    return(
        <div className='DP-Main-Wrapper'>
            <h1 className="DP-Title">Are you sure you want to delete this comment?</h1>
            <h1 className="DP-Post">{deletedComment}</h1>
            <div className="DP-Buttons">
                <div className="DP-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="DP-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeleteComment
