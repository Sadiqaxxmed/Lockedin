import React from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import "./SplashPage.css";

function SplashPage() {

  return (
    <div className="SP-body" style={{ backgroundColor: 'white' }}>
      <i class="fa-brands fa-linkedin fa-2xl SP-Logo"></i>
      <OpenModalButton
        className="SP-Login"
        id="button"
        buttonText="Log In"
        modalComponent={<LoginFormModal />}
      />
      <OpenModalButton
        className="SP-Signup"
        buttonText="Sign Up"
        modalComponent={<SignupFormModal />}
      />
      <h1 className="SP-Title">Welcome To Lockedin</h1>
      <h2 className="SP-Sub-Title">Lock In & Secure Your Next Dream Job.</h2>
      <img className="SP-Background" src="https://www.codeur.com/blog/wp-content/uploads/2022/02/image-LinkedIn-1.jpg"></img>
      <img className="SP-About-Me-Pic" src="https://avatars.githubusercontent.com/u/43020644?v=4"></img>
      <h3 className="SP-About-Me">Hi there! I'm a full stack developer based in Dallas Texas.</h3>
      <a href="https://github.com/Sadiqaxxmed">
        <i class="fa-brands fa-github fa-lg githubLink"></i>
      </a>
      <a href="https://www.linkedin.com/in/sadiqaxxmed/">
        <i class="fa-brands fa-linkedin-in fa-lg linkedinLink"></i>
      </a>
    </div>
  );
}

export default SplashPage;
