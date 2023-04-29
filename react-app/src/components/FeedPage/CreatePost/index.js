import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import "./CreatePost.css";
import { thunkCreatePost } from "../../../store/post";
import { useModal } from "../../../context/Modal";


const CreatePost = () => {

  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState('')

  const user = useSelector(state => state.session.user?.id)



  const handleSubmit = async (e) => {
    e.preventDefault();
    let err = {}

    if (post.length <= 0) {
      err.emptyPost = 'Empty field cannot be submitted.'
    }

    if (Object.values(err).length) return setErrors(err)

    const formData = new FormData();

    formData.append('post', post)
    formData.append('owner_id', user)

    closeModal();
    dispatch(thunkCreatePost(formData, user));
    return history.push('/feed');

};

  return (
    <div className="FD-form">
      <h3 className="FD-Title">Start a Post!</h3>
      {errors.emptyPost ? <div className="PS-Empty-Errors">{errors.emptyPost}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="FD-Post_Div">
          <textarea
            type="text"
            className="FD-Post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            required
          />
        </div>
        <div className="FD-Del-Button" onClick={handleSubmit} type="submit">Post</div>
      </form>
    </div>
  );
};

export default CreatePost;
