import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateComment } from "../../../store/comment";
import { useModal } from "../../../context/Modal";

import './UpdateComment.css'
const UpdateComment = (props) => {

  const {post, comment} = props;

  const history = useHistory()
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [errors, setErrors] = useState({});


  const [updateComment, setUpdateComment] = useState(comment.comment.comment)

  const postId = post.id
  const commentId = comment.comment.id

  const handleUpdateComment = (e) => {
    e.preventDefault();

    let err = {}

    if (updateComment.length <= 0) {
      err.emptyComment = 'Empty field cannot be submitted.'
    }

    if (Object.values(err).length) return setErrors(err)

    closeModal();
    dispatch(thunkUpdateComment(postId, commentId, updateComment));
    return history.push('/feed');
};

  return (
    <div className="FD-Update-Comment">
      <h3 className="FD-Update-Comment-Title">Edit Comment!</h3>
      <i class="fa-solid fa-xmark FD-Update-Comment-xmark-icon"
        onClick={() => closeModal()}
      ></i>
      <div class="custom-line"></div>
      {errors.emptyComment ? <div className="CM-Empty-Errors">{errors.emptyComment}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleUpdateComment}
        method="PUT"
        encType="multipart/form-data"
      >
        <div className="FD-Update-Comment-Div">
          <textarea
            type="text"
            className="FD-Update-Comment-TextArea"
            placeholder={updateComment}
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
            required
          />
        </div>
        <div className="FD-Comment-Update-Button" onClick={handleUpdateComment} type="submit">Edit</div>
      </form>
    </div>
  );
};

export default UpdateComment;
