import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./FeedPage.css";

import { thunkGetPosts, thunkUpdatePost } from "../../store/post";

import OpenModalButton from "../OpenModalButton";
import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

function FeedPage() {

  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const posts = Object.values(useSelector((state) => state.posts.allPosts));

  useEffect(() => {
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
        </div>
      </div>
      <div className="FD-Post-Div">
        {posts.map((post) => (
          <div className="FD-Posted-Card">
            <img className="FD-Posted-Card-Img" src="https://avatars.githubusercontent.com/u/43020644?v=4"></img>
            <h3 className="FD-Posted-Card-Name">Sadiq Ahmed</h3>
              <OpenModalButton
                className="FD-Posted-Card-Update"
                buttonText="Edit a post"
                onButtonClick={''}
                modalComponent={<UpdatePost post={post} />}
              />
              <OpenModalButton
                className="FD-Posted-Card-Delete"
                buttonText="Delete a post"
                onButtonClick={''}
                modalComponent={<DeletePost post={post} />}
              />
            <p className="FD-Posted-Card-Description">{post?.post}</p>
            <i class="fa-regular fa-thumbs-up FD-Posted-Card-Like-Icon"></i>
            <i class="fa-regular fa-comment FD-Posted-Card-Comment-Icon"></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;
