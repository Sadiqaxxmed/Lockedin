import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./FeedPage.css";

import { thunkGetPosts } from "../../store/post";

import OpenModalButton from "../OpenModalButton";
import CreatePost from "./CreatePost";

function FeedPage() {
  const dispatch = useDispatch();

  const [post, setPost] = useState("");

  // const user = useSelector(state => state.session.user)
  const posts = Object.values(useSelector((state) => state.posts.allPosts));


  useEffect(async () => {
    dispatch(thunkGetPosts());
  }, [dispatch]);

  return (
    <div className="FD-main-div">
      <div className="FD-Profile-Card"></div>

      <div className="FD-Post-Card">
        <img
          className="FD-Post-Card-Img"
          src="https://avatars.githubusercontent.com/u/43020644?v=4"
        ></img>
        <div>
          <OpenModalButton
            className="FD-Post-Button"
            buttonText="Start a post"
            modalComponent={<CreatePost />}
          />
          {/* <p className="FD-Post-Button-Text">Start a Post</p> */}
        </div>
      </div>

      <div className="FD-Post-Div">
        {posts.map((post) => (
          <div className="FD-Posted-Card">
            <img
              className="FD-Posted-Card-Img"
              src="https://avatars.githubusercontent.com/u/43020644?v=4"
            ></img>
            <h3 className="FD-Posted-Card-Name">Sadiq Ahmed</h3>
            <i class="fa-solid fa-ellipsis FD-Posted-Card-Menu-Icon"></i>
            <p className="FD-Posted-Card-Description">
              {post.post}
            </p>
            <i class="fa-regular fa-thumbs-up FD-Posted-Card-Like-Icon"></i>
            <i class="fa-regular fa-comment FD-Posted-Card-Comment-Icon"></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;
