import React from "react";

import "./FeedPage.css";

function FeedPage() {
  return (
    <div className="FD-main-div">
      <div className="FD-Profile-Card"></div>
      <div className="FD-Post-Card">
        <img
          className="FD-Post-Card-Img"
          src="https://avatars.githubusercontent.com/u/43020644?v=4"
        ></img>
        <input placeholder="Start a Post" className="FD-Post-Input"></input>
      </div>
      <div className="FD-Post-Div">
        <div className="FD-Posted-Card">
          <img
            className="FD-Posted-Card-Img"
            src="https://avatars.githubusercontent.com/u/43020644?v=4"
          ></img>
          <h3 className="FD-Posted-Card-Name">Sadiq Ahmed</h3>
          <i class="fa-solid fa-ellipsis FD-Posted-Card-Menu-Icon"></i>
          <p className="FD-Posted-Card-Description">
            I’ve made a lot of mistakes in my software engineering career. If I
            could go back, there’s a lot I’m going to change.
          </p>
          <i class="fa-regular fa-thumbs-up FD-Posted-Card-Like-Icon"></i>
          <i class="fa-regular fa-comment FD-Posted-Card-Comment-Icon"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
