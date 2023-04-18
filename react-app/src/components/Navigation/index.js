import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="NV-div-main">
        <div className="NV-div-left">
          <NavLink exact to="/">
            <i class="fa-brands fa-linkedin fa-2xl"></i>
          </NavLink>
          <input placeholder='Search' className="NV-search"></input>
        </div>

        <div className="NV-div-right">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
    </>
  );
}

export default Navigation;
