import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import SignupFormPage from "../SignupFormPage";

import "./SplashPage.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { NavLink } from "react-router-dom";

import logo from '../../Images/LockedInLogo.png'


function SplashPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
			if (data) {
		setErrors(data);
		}
    history.push("/Feed");
	};

	const handleDemoSubmit = async (e) => {
		e.preventDefault()
		dispatch(login('demo@aa.io', 'password'))
    history.push("/Feed");
		// return <Redirect to="/Feed" />
	}

  return (
    <div className="SP-body" style={{ backgroundColor: 'white' }}>

      <img className="SP-LockedInLogo" src={logo} alt="Logo" />

      <div className="SP-Left-Div">
      <h3 className="SP-Sub-Title">Welcome to your professional community</h3>
      <form onSubmit={handleSubmit} className="SP-Form">
        <div className="SP-Email-Div">
          <div className="SP-Email-Container">
            <p className="SP-Email-Text">Email</p>
            <input
              className="SP-Email-Input"
              placeholder=""
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="SP-Password-Div">
          <div className="SP-Password-Container">
            <p className="SP-Password-Text">Password</p>
            <input
              className="SP-Password-Input"
              placeholder=""
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="SP-Button-Div">
          <button className="SP-Signin-Button" type="submit">Sign in</button>
          <button className="SP-Demo-Button" onClick={handleDemoSubmit}>Demo</button>
        </div>
      </form>
      <div className="SP-Errors">
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </div>
      <div className="SP-Or-Div">
        <div className="SP-Or-Container">
          <div className="SP-Left-Or-Line"></div>
          <p className="SP-Or-Text">or</p>
          <div className="SP-Right-Or-Line"></div>
        </div>
      </div>
      <div className="SP-Signup-Div">
        <div className="SP-Signup-Container">
          <OpenModalButton
            buttonText="New to Lockedin? Join now"
            className="SP-Signup-Button"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </div>
      </div>

      <div className="SP-Right-Div">
      <img className="SP-Background" src="https://raw.githubusercontent.com/yhtay/EmployedIn-Capstone/main/react-app/src/components/SplashLoginPage/SplashLoginImages/linkedin-splashpage-img.svg"></img>
      </div>
    </div>
  );
}

export default SplashPage;
