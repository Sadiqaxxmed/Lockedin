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
      <h3 className="FD-Title">Edit Comment!</h3>
      {errors.emptyComment ? <div className="CM-Empty-Errors">{errors.emptyComment}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleUpdateComment}
        method="PUT"
        encType="multipart/form-data"
      >
        <div className="FD-Post_Div">
          <textarea
            type="text"
            className="FD-Post"
            placeholder={updateComment}
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
            required
          />
        </div>
        <div className="FD-Del-Button" onClick={handleUpdateComment} type="submit">Edit</div>
      </form>
    </div>
  );
};

export default UpdateComment;
