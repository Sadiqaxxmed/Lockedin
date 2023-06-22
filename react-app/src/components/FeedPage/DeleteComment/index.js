import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteComment } from "../../../store/comment";

import { useModal } from "../../../context/Modal";

import './DeleteComment.css'

const DeleteComment = ({comment}) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const userId = useSelector(state => state.session.user?.id)

    const deletedComment = comment.comment.comment
    const commentId = comment.comment.id



    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteComment({commentId, userId}))
        closeModal()
    }

    return(
        <div className='FD-Comment-Main-Wrapper'>
            <h1 className="FD-Delete-Comment-Title">Are you sure you want to delete this comment?</h1>
            <div className="FD-Delete-Comment-Buttons">
                <div className="FD-Comment-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="FD-Comment-Delete-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeleteComment
