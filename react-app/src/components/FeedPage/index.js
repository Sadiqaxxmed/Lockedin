import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./FeedPage.css";

import { thunkGetPosts, thunkLikedPosts, thunkLikePost, thunkUnlikePost} from "../../store/post";
import { thunkGetComments } from "../../store/comment";

import OpenModalButton from "../OpenModalButton";

import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";

import CreateComment from "./CreateComment";
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProfilePage from "../ProfilePage";

function FeedPage() {

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [postCardId, setPostCardId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [commentDropDownVisible, setCommentDropDownVisible] = useState(false);
  const [commentPost, setCommentPost] = useState(null)



  const currUser = useSelector((state) => state.session?.user);
  const posts = Object.values(useSelector((state) => state.posts.allPosts));
  const likedPosts = Object.values(useSelector(state => state.posts.likedPosts)).map(post => post.id);
  const comments = Object.values(useSelector((state) => state.comments.allComments));
  const postCommentsArr = Object.values(comments);

  const closeDropDown = (e) => {
    if (commentDropDownVisible &&
        e.target.closest(".FD-Comment-Top") === null &&
        e.target.closest(".comment-icon-div") === null
        ) {
            setCommentDropDownVisible(false)
        }
  };

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

  useEffect(() => {
      document.addEventListener("click", closeDropDown);
      return () => {
          document.removeEventListener("click", closeDropDown);
    };
  }, [commentDropDownVisible]);


  useEffect(() => {
    dispatch(thunkGetPosts());
    dispatch(thunkGetComments());
    dispatch(thunkLikedPosts(currUser?.id));
  }, [dispatch]);

  function isLikedPost(postId, userId) {

    if (likedPosts.includes(postId)) {
      dispatch(thunkUnlikePost(postId, userId))
    } else dispatch(thunkLikePost(postId, userId))

    return
  }

  return currUser && (
    <>
    {/* MAIN DIV */}
    <div className="FD-main-div">
    {/* PROFILE SIDE CARD DIV  */}
    <div className="FD-Profile-SideCard">
      <img className="FD-Header-SideCard-Img" src={currUser?.headerImage}></img>
      <Link to={`/profile/${currUser?.id}`}>
      <img className="FD-Profile-SideCard-Img" src={currUser?.profileImage}></img>
      </Link>
      <div className="FD-Profile-SideCard-Info">
        <p className="FD-Profile-SideCard-Name">{currUser?.firstname} {currUser?.lastname}</p>
        <p className="FD-Profile-SideCard-Occupation">{currUser?.occupation}</p>
      </div>
    </div>
    {/* START A POST DIV  */}
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
      {/* MAIN POSTS FEED DIV */}
      <div className="FD-Post-Div">
        <>
          {posts.map((post) => (
            // POSTED CARD DIV
            <div className="FD-Posted-Card">
            {/* POSTED CARD USER INFO */}
            <Link to={`/Profile/${post.post.user?.id}`}>
              <img
                className="FD-Posted-Card-Img"
                src={post.post.user?.profileImage}
              ></img>
            </Link>
              <h3 className="FD-Posted-Card-Name">
                {post.post.user?.firstname} {post.post.user?.lastname}
              </h3>
              <p className="FD-Posted-Card-Occupation">{post.post.user?.occupation}</p>
              {/* POSTED CARD EDIT ICON */}
              {currUser?.id === post.post.owner_id && (
                <div className="FD-Menu-Main">
                  <i
                    class="fa-solid fa-ellipsis Post-Menu-Icon"
                    onClick={(e) => handleMenu(post.post.id)}
                  ></i>
                  {menuOpen && postCardId === post.post.id && (
                    <div className="FD-Menu-Options">
                      <div className="FD-Posted-Menu-Edit-Div">
                      <i class="fa-regular fa-pen-to-square FD-Menu-Icons"></i>
                      <OpenModalButton
                        className="FD-Posted-Card-Update"
                        buttonText="Edit"
                        onButtonClick={""}
                        modalComponent={<UpdatePost post={post.post} />}
                      />
                      </div>
                      
                      <div className="FD-Posted-Menu-Delete-Div">
                      <i class="fa-solid fa-trash-can FD-Menu-Icons"></i>
                      <OpenModalButton
                        className="FD-Posted-Card-Delete"
                        buttonText="Delete"
                        onButtonClick={""}
                        modalComponent={<DeletePost post={post.post} />}
                      />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* POSTED CARD: POST/LIKE/COMMENT/ICONS */}
              <p className="FD-Posted-Card-Description">{post?.post.post}</p>
              <div className="FD-Posted-Like-Comment-Div">
                <div className="like-icon-div">
                  {likedPosts.includes(post.post.id) ? (
                    <>
                    <i 
                      class="fa-solid fa-thumbs-up FD-Posted-Liked-Icon"
                      onClick={() => isLikedPost(post.post.id, currUser.id)}
                    ></i>
                    <p className="FD-Posted-Liked-Text">Like</p>
                    
                    </>
                  ) : (
                    <>
                    <i 
                      class="fa-regular fa-thumbs-up FD-Posted-Like-Icon"
                      onClick={() => isLikedPost(post.post.id, currUser.id)}
                    ></i>
                    <p className="FD-Posted-Like-Text">Like</p>
                    </>
                  )}
                
              </div>
              <div
                    onClick={() => {
                        setCommentDropDownVisible(!commentDropDownVisible);
                        setCommentPost(post.post.id);
                    }}
                    className="comment-icon-div"
                >
                <i class="fa-regular fa-comment-dots FD-Posted-Like-Icon"></i>
                <p className="FD-Posted-Comment-Text">Comment</p>
                </div>
              </div>
              {commentPost === post.post.id && (
              // COMMENT DIV
              <div className={ commentDropDownVisible ? "FD-Comment-Div" : "hidden"}>
                {/* LEAVE A COMMENT SECTION */}
                <div className="FD-Comment-Top">
                  <div className="FD-Comment-Input-Div">
                    <img
                      className="FD-Comment-Card-Img"
                      src={currUser?.profileImage}
                    ></img>
                    <div className="FD-Comment-Card">
                      <OpenModalButton
                        buttonText="Leave a comment..."
                        className="FD-Comment-Input"
                        modalComponent={<CreateComment post={post.post} />}
                      />
                    </div>
                  </div>
                  {/* COMMENTS SECTION: USR INFO & COMMENT POSTED*/}
                  {getPostComments(post.post.id).map((comment) => (
                    <div className="FD-Comment-Bottom">
                      <div className="FD-Posted-Comment">
                        <div className="FD-Posted-Comment-Img">
                        <img
                          className="FD-Comment-Card-Img"
                          src={
                            comment.comment.user?.profileImage
                              ? comment.comment.user?.profileImage
                              : "https://avatars.githubusercontent.com/u/43020644?v=4"
                          }
                        ></img>
                        </div>
                        <div className="FD-Posted-Comment-Info-Div">
                        <p className="FD-Posted-Comment-Name">{comment.comment.user?.firstname} {comment.comment.user?.lastname}</p>
                        <p className="FD-Posted-Comment-Occupation">{comment.comment.user?.occupation}</p>
                        <p className="FD-Comment">{comment.comment?.comment}</p>
                        {/* COMMENT EDIT ICON */}
                        {currUser?.id === comment.comment.owner_id && (
                          <div className="FD-Comment-Menu-Main">
                            <i
                              class="fa-solid fa-ellipsis FD-Comment-Menu-Icon"
                              onClick={(e) => commentMenu(comment.comment.id)}
                            ></i>
                            {menuOpen && commentId === comment.comment.id && (
                              <div className="FD-Comment-Menu-Options">
                                <div className="FD-Comment-Menu-Edit-Div">
                                <i class="fa-regular fa-pen-to-square FD-Menu-Icons"></i>
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
                                </div>
                                <div className="FD-Comment-Menu-Delete-Div">
                                <i class="fa-solid fa-trash-can FD-Menu-Icons"></i>
                                <OpenModalButton
                                  className="FD-Comment-Delete"
                                  buttonText="Delete"
                                  onButtonClick={""}
                                  modalComponent={
                                    <DeleteComment comment={comment} />
                                  }
                                />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>
          ))}
        </>
      </div>
      {/* LOCKEDIN NEWS DIV */}
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
