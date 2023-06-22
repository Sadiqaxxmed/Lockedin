import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment, thunkGetComments } from "../../../store/comment";
import { useModal } from "../../../context/Modal";

import './CreateComment.css'

const CreateComment = (post) => {

  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState('')

  const user = useSelector(state => state.session.user?.id)
  const postId = post.post.id




  const handleSubmit = async (e) => {
    e.preventDefault();

    let err = {}

    if (comment.length <= 0) {
      err.emptyComment = 'Empty field cannot be submitted.'
    }

    if (Object.values(err).length) return setErrors(err)


    const formData = new FormData();

    formData.append('comment', comment)
    formData.append('userId', user)
    formData.append('postId', postId)


    closeModal();
    dispatch(thunkCreateComment(formData, user, postId));
    return history.push('/feed');

};

  return (
    <div className="FD-Post-Comment">
      <h3 className="FD-Create-Comment-Title">Leave a Comment!</h3>
      <i class="fa-solid fa-xmark FD-Create-Comment-xmark-icon"
        onClick={() => closeModal()}
      ></i>
      <div class="custom-line"></div>
      {errors.emptyComment ? <div className="CM-Empty-Errors">{errors.emptyComment}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="FD-Create-Comment-Div">
          <textarea
            type="text"
            className="FD-Create-Comment-TextArea"
            placeholder={"What do you want to say?"}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="FD-Comment-Submit-Button" onClick={handleSubmit} type="submit">Submit</div>
      </form>
    </div>
  );
};

export default CreateComment;
