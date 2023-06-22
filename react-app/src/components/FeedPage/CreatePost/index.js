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
    <div className="FD-Create-Post">
      <h3 className="FD-Create-Post-Title">Start a Post!</h3>
      <i class="fa-solid fa-xmark PP-Create-Post-xmark-icon"
        onClick={() => closeModal()}
      ></i>
      <div class="custom-line"></div>
      {errors.emptyPost ? <div className="PS-Empty-Errors">{errors.emptyPost}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="FD-Create-Post-Div">
          <textarea
            type="text"
            className="FD-Create-Post-TextArea"
            placeholder={"What do you want to talk about?"}
            value={post}
            onChange={(e) => setPost(e.target.value)}
            required
          />
        </div>
        <div className="FD-Delete-Button" onClick={handleSubmit} type="submit">Post</div>
      </form>
    </div>
  );
};

export default CreatePost;
