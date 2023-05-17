import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./FeedPage.css";

import { thunkGetPosts } from "../../store/post";
import { thunkGetComments } from "../../store/comment";

import OpenModalButton from "../OpenModalButton";

import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

import CreateComment from "./CreateComment";
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";

function FeedPage() {

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [postCardId, setPostCardId] = useState(null);
  const [commentId, setCommentId] = useState(null);

  const currUser = useSelector((state) => state.session?.user);
  const posts = Object.values(useSelector((state) => state.posts.allPosts));
  const comments = Object.values(useSelector((state) => state.comments.allComments));
  const postCommentsArr = Object.values(comments);

  useEffect(() => {
    dispatch(thunkGetPosts());
    dispatch(thunkGetComments());
  }, [dispatch]);

  function handleMenu(id) {
    if (!menuOpen && id) {
      setMenuOpen(true);
      setPostCardId(id);
    } else {
      setMenuOpen(false);
      setPostCardId(null);
    }
  }

  function commentMenu(id) {
    if (!menuOpen && id) {
      setMenuOpen(true);
      setCommentId(id);
    } else {
      setMenuOpen(false);
      setCommentId(null);
    }
  }

  function getPostComments(postId) {
    const postComments = [];

    for (let i = 0; i < postCommentsArr.length; i++) {
      const comment = postCommentsArr[i];
      if (comment.comment.comment_id === postId) {
        postComments.push(comment);
      }
    }

    return postComments;
  }

  return currUser && (
    <>


    <div className="FD-main-div">

    <div className="FD-Profile-SideCard">
      <img className="FD-Header-SideCard-Img" src={currUser?.headerImage}></img>
      <img className="FD-Profile-SideCard-Img" src={currUser?.profileImage}></img>
      <div className="FD-Profile-SideCard-Info">
        <p className="FD-Profile-SideCard-Name">{currUser?.firstname} {currUser?.lastname}</p>
        <p className="FD-Profile-SideCard-Occupation">{currUser?.occupation}</p>
      </div>
    </div>

      <div className="FD-Post-Card">
        <img className="FD-Post-Card-Img" src={currUser?.profileImage}></img>
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
                src={post.post.user?.profileImage}
              ></img>
              <h3 className="FD-Posted-Card-Name">
                {post.post.user?.firstname} {post.post.user?.lastname}
              </h3>
              {currUser?.id === post.post.owner_id && (
                <div className="FD-Menu-Main">
                  <i
                    class="fa-solid fa-ellipsis"
                    onClick={(e) => handleMenu(post.post.id)}
                  ></i>
                  {menuOpen && postCardId === post.post.id && (
                    <div className="FD-Menu-Options">
                      <OpenModalButton
                        className="FD-Posted-Card-Update"
                        buttonText="Edit"
                        onButtonClick={""}
                        modalComponent={<UpdatePost post={post.post} />}
                      />
                      <OpenModalButton
                        className="FD-Posted-Card-Delete"
                        buttonText="Delete"
                        onButtonClick={""}
                        modalComponent={<DeletePost post={post.post} />}
                      />
                    </div>
                  )}
                </div>
              )}

              <p className="FD-Posted-Card-Description">{post?.post.post}</p>
              <div className="FD-Comment-Div">
                <div className="FD-Comment-Top">
                  <div className="FD-Comment-Input-Div">
                    <img
                      className="FD-Comment-Card-Img"
                      src={currUser?.profileImage}
                    ></img>
                    <div>
                      <OpenModalButton
                        buttonText="Leave a comment..."
                        className="FD-Comment-Input"
                        modalComponent={<CreateComment post={post.post} />}
                      />
                    </div>
                  </div>

                  {getPostComments(post.post.id).map((comment) => (
                    <div className="FD-Comment-Bottom">
                      <div className="FD-Posted-Comment">
                        <img
                          className="FD-Comment-Card-Img"
                          src={
                            comment.comment.user?.profileImage
                              ? comment.comment.user?.profileImage
                              : "https://avatars.githubusercontent.com/u/43020644?v=4"
                          }
                        ></img>
                        <p className="FD-Comment">{comment.comment.comment}</p>
                        {currUser?.id === comment.comment.owner_id && (
                          <div className="FD-Comment-Menu-Main">
                            <i
                              class="fa-solid fa-ellipsis"
                              onClick={(e) => commentMenu(comment.comment.id)}
                            ></i>

                            {menuOpen && commentId === comment.comment.id && (
                              <div className="FD-Comment-Menu-Options">
                                <OpenModalButton
                                  className="FD-Comment-Update"
                                  buttonText="Edit"
                                  onButtonClick={""}
                                  modalComponent={
                                    <UpdateComment
                                      post={post}
                                      comment={comment}
                                    />
                                  }
                                />
                                <OpenModalButton
                                  className="FD-Comment-Delete"
                                  buttonText="Delete"
                                  onButtonClick={""}
                                  modalComponent={
                                    <DeleteComment comment={comment} />
                                  }
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </>
      </div>

      <div className="FD-LockedInNews-SideCard">
        <p className="FD-LockedInNews-Title"> LockedIn News</p>

        <ul className="FD-News-List">
          <li className="FD-List-Text">Senators grill SVB, Signature execs</li>
          <p className="FD-Secondary-Text">Top news • 5,050 readers</p>

          <li className="FD-List-Text">Tesla votes down succession plan</li>
          <p className="FD-Secondary-Text">2h ago • 5,854 readers</p>

          <li className="FD-List-Text">Zoom invests in buzzy AI startup</li>
          <p className="FD-Secondary-Text">1h ago • 746 readers</p>

          <li className="FD-List-Text">'Taco Tuesday' trademark under fire</li>
          <p className="FD-Secondary-Text">3h ago • 2,710 readers</p>
        </ul>

      </div>
    </div>
    </>
  );
}

export default FeedPage;
