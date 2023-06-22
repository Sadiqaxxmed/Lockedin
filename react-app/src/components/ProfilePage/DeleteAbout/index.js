import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteAbout } from "../../../store/session";

import './DeleteAbout.css'
import { useModal } from "../../../context/Modal";


const DeleteAbout = (currentUser) => {

    const history = useHistory()
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const userId = useSelector(state => state.session.user?.id)

    const deletedAbout = currentUser.user.about

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteAbout({userId}))
        closeModal()
        return history.push(`/profile/${userId}`);
    }

    return(
        <div className='PP-Main-Wrapper'>
            <h1 className="PP-Delete-Title">Are you sure you want to delete your about section?</h1>
            <div className="PP-Buttons">
                <div className="PP-Cancel-Button" onClick={() => closeModal()}>Cancel</div>
                <div className="PP-Del-Button" onClick={handleDelete}>Delete</div>
            </div>
        </div>
    )
}

export default DeleteAbout
