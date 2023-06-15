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

return (
    <div className="PP-Update-About">
      <h3 className="PP-Update-Title">Edit About</h3>
      <i class="fa-solid fa-xmark PP-Edit-About-xmark-icon"
        onClick={() => closeModal()}
      ></i>
      <div class="custom-line"></div>
      {errors.emptyUpdate ? <div className="CM-Empty-Errors">{errors.emptyUpdate}</div> : null}
      <form
        className="PP-Form"
        onSubmit={handleUpdateAbout}
        method="PUT"
        encType="multipart/form-data"
      >
        <div className="PP-Update-About-Div">
          <textarea
            type="text"
            className="PP-Update-About-TextArea"
            placeholder={updateAbout}
            value={updateAbout}
            onChange={(e) => setUpdateAbout(e.target.value)}
            required
          />
        </div>
        <div className="PP-Update-Button" onClick={handleUpdateAbout} type="submit">Save</div>
      </form>
    </div>
  );
};

export default UpdateAbout;
