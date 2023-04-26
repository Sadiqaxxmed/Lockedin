import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkUpdateComment } from "../../../store/comment";
import { useModal } from "../../../context/Modal";


const UpdateComment = (props) => {

  const {post, comment} = props;

  const history = useHistory()
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const [updateComment, setUpdateComment] = useState(comment.comment)

  const postId = post.id
  const commentId = comment.id

  const handleUpdate = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(thunkUpdateComment(postId, commentId, updateComment));
    return history.push('/feed');
};

  return (
    <>
      <h3 className="FD-Title">Edit Post!</h3>
      <form
        className="PS-Form"
        onSubmit={handleUpdate}
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
        <div className="FD-Del-Button" onClick={handleUpdate} type="submit">Edit</div>
      </form>
    </>
  );
};

export default UpdateComment;
