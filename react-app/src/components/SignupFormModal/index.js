import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          firstname,
          lastname,
          email,
          occupation,
          profileImage,
          headerImage,
          password
        )
      );
      if (data) {
        const obj = {};

        for (let i = 0; i < data.length; i++) {
          const [key, value] = data[i].split(" : ");
          obj[key] = value;
        }
        console.log("Data", obj);
        setErrors(obj);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-form-modal">
      <h1 className="signup-title">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="SM">
          <div className="SM-Email-Div">
            <div className="SM-Email-Container">
							{errors.email && <p className="SG-Email-Err">{errors.email}</p>}
              <p className="SM-Text">Email</p>
              <input
                className="SM-Input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Firstname-Div">
            <div className="SM-Firstname-Container">
						{errors.firstname && <p className="SG-Email-Err">{errors.firstname}</p>}
              <p className="SM-Text">Firstname</p>
              <input
                className="SM-Input"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Lastname-Div">
            <div className="SM-Lastname-Container">
						{errors.lastname && <p className="SG-Email-Err">{errors.lastname}</p>}
              <p className="SM-Text">Lastname</p>
              <input
                className="SM-Input"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Occupation-Div">
            <div className="SM-Occupation-Container">
						{errors.occupation && <p className="SG-Email-Err">{errors.occupation}</p>}
              <p className="SM-Text">Occupation</p>
              <input
                className="SM-Input"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Profile-Image-Div">
            <div className="SM-Profile-Image-Container">
						{errors.profileImage && <p className="SG-Email-Err">{errors.profileImage}</p>}
              <p className="SM-Text">Profile Image</p>
              <input
                className="SM-Input"
                type="text"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Header-Image-Div">
            <div className="SM-Header-Image-Container">
						{errors.headerImage && <p className="SG-Email-Err">{errors.headerImage}</p>}
              <p className="SM-Text">Header Image</p>
              <input
                className="SM-Input"
                type="text"
                value={headerImage}
                onChange={(e) => setHeaderImage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Password-Div">
            <div className="SM-Password-Container">
						{errors.password && <p className="SG-Email-Err">{errors.password}</p>}
              <p className="SM-Text">Password</p>
              <input
                className="SM-Input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="SM-Confirm-Password-Div">
            <div className="SM-Confirm-Password-Container">
						{errors.confirmPassword && <p className="SG-Email-Err">{errors.confirmPassword}</p>}
              <p className="SM-Text">Confirm Password</p>
              <input
                className="SM-Input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="LM-Button" onClick={handleSubmit} type="submit">
          Sign Up
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
