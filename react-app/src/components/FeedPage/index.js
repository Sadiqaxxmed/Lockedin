import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import "./FeedPage.css";

import { thunkGetPosts, thunkUpdatePost } from "../../store/post";
import { thunkGetComments, thunkCreateComment } from "../../store/comment";

import OpenModalButton from "../OpenModalButton";

import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

import CreateComment from "./CreateComment";
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";

function FeedPage() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState("");
  const [post, setPost] = useState("");

  const history = useHistory();
  const userId = useSelector((state) => state.session.user?.id);
  const firstName = useSelector((state) => state.session.user.firstname);

  const posts = Object.values(useSelector((state) => state.posts.allPosts));
  const comments = Object.values(
    useSelector((state) => state.comments.allComments)
  );

  const postCommentsArr = Object.values(comments);

  useEffect(() => {
    dispatch(thunkGetPosts());
    dispatch(thunkGetComments());
  }, [dispatch]);

  function getPostComments(postId) {
    const postComments = [];

    for (let i = 0; i < postCommentsArr.length; i++) {
      const comment = postCommentsArr[i];
      if (comment.comment_id === postId) {
        postComments.push(comment);
      }
    }

    return postComments;
  }

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
        <>
          {posts.map((post) => (
            <div className="FD-Posted-Card">
              <img
                className="FD-Posted-Card-Img"
                src="https://avatars.githubusercontent.com/u/43020644?v=4"
              ></img>
              <h3 className="FD-Posted-Card-Name">Sadiq Ahmed</h3>
              <OpenModalButton
                className="FD-Posted-Card-Update"
                buttonText="Edit a post"
                onButtonClick={""}
                modalComponent={<UpdatePost post={post} />}
              />
              <OpenModalButton
                className="FD-Posted-Card-Delete"
                buttonText="Delete a post"
                onButtonClick={""}
                modalComponent={<DeletePost post={post} />}
              />
              <p className="FD-Posted-Card-Description">{post?.post}</p>
              <div className="FD-Comment-Div">
                <div className="FD-Comment-Top">
                  <div className="FD-Comment-Input-Div">
                    <img
                      className="FD-Comment-Card-Img"
                      src="https://avatars.githubusercontent.com/u/43020644?v=4"
                    ></img>
                    <div>
                      <OpenModalButton
                        buttonText="Leave a comment..."
                        className="FD-Comment-Input"
                        modalComponent={<CreateComment post={post} />}
                      />
                    </div>
                  </div>

                  {getPostComments(post.id).map((comment) => (
                    <div className="FD-Comment-Bottom">
                      <div className="FD-Posted-Comment">
                        <img
                          className="FD-Comment-Card-Img"
                          src="https://avatars.githubusercontent.com/u/43020644?v=4"
                        ></img>
                        <p className="FD-Comment">{comment.comment}</p>
                        <OpenModalButton
                          className="FD-Comment-Update"
                          buttonText="Edit"
                          onButtonClick={""}
                          modalComponent={
                            <UpdateComment post={post} comment={comment} />
                          }
                        />
                        <OpenModalButton
                          className="FD-Comment-Delete"
                          buttonText="Delete"
                          onButtonClick={""}
                          modalComponent={<DeleteComment comment={comment} />}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <i class="fa-regular fa-thumbs-up FD-Posted-Card-Like-Icon"></i>
            <i class="fa-regular fa-comment FD-Posted-Card-Comment-Icon"></i> */}
            </div>
          ))}
        </>
      </div>
    </div>
  );
}

export default FeedPage;
