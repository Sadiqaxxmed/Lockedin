import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu}>
        <img className="profile-icon" src={user?.profileImage}></img>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="Logedin-Div">
            <div className="userInfo">
              <img className="Logedin-profile-icon" src={user.profileImage}></img>
              <p className="Logedin-Username">{user.firstname} {user.lastname}</p>
              <p className="Logedin-User-Occupation">{user.occupation}</p>
            </div>
            <div className="LI-ViewProfile-Button">View Profile</div>
            <hr className="Custom-Break-Hr"></hr>
            <div className="Logout" onClick={handleLogout}>Sign Out</div>
          </div>
        ) : (
          <div className="Logedout-Div">
            <OpenModalButton
              className='Login'
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              className='Singup'
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
