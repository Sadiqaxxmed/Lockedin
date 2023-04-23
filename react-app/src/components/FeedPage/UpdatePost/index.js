import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import "./UpdatePost.css";
import { thunkUpdatePost } from "../../../store/post";
import { useModal } from "../../../context/Modal";


const UpdatePost = (post) => {

  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [updatePost, setUpdatePost] = useState(post.post.post)
  const postId = post.post.id

  const handleUpdate = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(thunkUpdatePost({postId, updatePost}));
    return history.push('/feed');
};

  return (
    <>
      <h3>Edit Post!</h3>
      <form
        className="PS-Form"
        onSubmit={handleUpdate}
        method="PUT"
        encType="multipart/form-data"
      >
        <div className="FD-Post_Div">
          <input
            type="text"
            className="FD-Post"
            placeholder={updatePost}
            value={updatePost}
            onChange={(e) => setUpdatePost(e.target.value)}
            required
          />
        </div>
        <button className='FD-Submit-Btn' type="submit">Submit</button>
      </form>
    </>
  );
};

export default UpdatePost;
