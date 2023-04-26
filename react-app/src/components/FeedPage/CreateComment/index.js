import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment } from "../../../store/comment";
import { useModal } from "../../../context/Modal";


const CreateComment = (post) => {

  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [comment, setComment] = useState('')

  const user = useSelector(state => state.session.user?.id)
  const postId = post.post.id




  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();


    formData.append('comment', comment)
    formData.append('userId', user)
    formData.append('postId', postId)


    closeModal();
    dispatch(thunkCreateComment(formData, user, postId));
    return history.push('/feed');

};

  return (
    <>
      <h3 className="FD-Title">Leave a Comment!</h3>
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
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <div className="FD-Del-Button" onClick={handleSubmit} type="submit">Submit</div>
      </form>
    </>
  );
};

export default CreateComment;
