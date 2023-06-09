import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "./UpdatePost.css";
import { thunkUpdatePost } from "../../../store/post";
import { useModal } from "../../../context/Modal";


const UpdatePost = (post) => {

  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [errors, setErrors] = useState({});
  const [updatePost, setUpdatePost] = useState(post.post.post)
  const postId = post.post.id

  const handleUpdate = (e) => {
    e.preventDefault();

    let err = {}

    if (updatePost.length <= 0) {
      err.emptyPost = 'Empty field cannot be submitted.'
    }

    if (Object.values(err).length) return setErrors(err)

    closeModal();
    dispatch(thunkUpdatePost({postId, updatePost}));
    return history.push('/feed');
};

  return (
    <div className="FD-Post-Update">
      <h3 className="FD-Update-Post-Title">Edit Post!</h3>
      <i class="fa-solid fa-xmark FD-Update-Post-xmark-icon"
        onClick={() => closeModal()}
      ></i>
      <div class="custom-line"></div>
      {errors.emptyPost ? <div className="PS-Empty-Errors">{errors.emptyPost}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleUpdate}
        method="PUT"
        encType="multipart/form-data"
      >
        <div className="PP-Update-Post-Div">
          <textarea
            type="text"
            className="FD-Update-Post-TextArea"
            placeholder={updatePost}
            value={updatePost}
            onChange={(e) => setUpdatePost(e.target.value)}
            required
          />
        </div>
        <div className="FD-Update-Button" onClick={handleUpdate} type="submit">Edit</div>
      </form>
    </div>
  );
};

export default UpdatePost;
