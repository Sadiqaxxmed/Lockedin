import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";

import './UpdateAbout.css'
import { thunkUpdateAbout, thunkGetSingleUser } from "../../../store/session";

const UpdateAbout = (currentUser) => {


  const history = useHistory()
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const [errors, setErrors] = useState({});


  const userId = useSelector((state) => state.session?.user?.id)
  const [updateAbout, setUpdateAbout] = useState(currentUser?.user?.about)

  const handleUpdateAbout = (e) => {
    e.preventDefault();

    let err = {}

    if (updateAbout.length <= 0) {
      err.emptyUpdate = 'Empty field cannot be submitted.'
    }

    if (Object.values(err).length) return setErrors(err)

    closeModal();
    dispatch(thunkUpdateAbout(userId, updateAbout));
    return history.push(`/profile/${userId}`);
};

// useEffect(() => {
//   dispatch(thunkGetSingleUser(userId));
// }, [dispatch, userId]);

  return (
    <div className="FD-Update-Comment">
      <h3 className="FD-Title">Edit About!</h3>
      {errors.emptyUpdate ? <div className="CM-Empty-Errors">{errors.emptyUpdate}</div> : null}
      <form
        className="PS-Form"
        onSubmit={handleUpdateAbout}
        method="PUT"
        encType="multipart/form-data"
      >
        <div className="FD-Post_Div">
          <textarea
            type="text"
            className="FD-Post"
            placeholder={updateAbout}
            value={updateAbout}
            onChange={(e) => setUpdateAbout(e.target.value)}
            required
          />
        </div>
        <div className="FD-Del-Button" onClick={handleUpdateAbout} type="submit">Edit</div>
      </form>
    </div>
  );
};

export default UpdateAbout;
