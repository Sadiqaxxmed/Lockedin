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
  const [post, setPost] = useState('')

  const user = useSelector(state => state.session.user.id)



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('post', post)
    formData.append('owner_id', user)

    closeModal();
    dispatch(thunkCreatePost(formData, user));
    return history.push('/feed');

};

  return (
    <>
      <h3 className="FD-Title">Start a Post!</h3>
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
        {/* <button className='FD-Submit-Btn' type="submit">Submit</button> */}
      </form>
    </>
  );
};

export default CreatePost;
