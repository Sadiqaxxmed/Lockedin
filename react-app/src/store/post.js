// -------------------------------------------------------------------- CONSTANT

import { actionGetComments, thunkGetComments } from "./comment";

const GET_POSTS     = 'POST/GET_POSTS';
const CREATE_POST   = 'POST/CREATE_POST';
const UPDATE_POST   = 'POST/UPDATE_POST';
const DELETE_POST   = 'POST/DELETE_POST';
const LIKE_POST     = 'POST/LIKE_POST';
const LIKED_POSTS   = 'POST/LIKED_POSTS';
const UNLIKE_POST   = 'POST/UNLIKE_POST';


// -------------------------------------------------------------------- ACTION

export const actiongGetPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts
  };
};

export const actionCreatePost = (post) => {
  return {
    type: CREATE_POST,
    post
  };
};

export const actionUpdatePost = (postId, post) => {
  return {
    type: UPDATE_POST,
    post,
    postId
  }
}

export const actionDeletePost = (postId, post) => {
  return {
    type: DELETE_POST,
    post,
    postId
  }
}

export const actionLikePost = (posts) => {
  return {
    type: LIKE_POST,
    posts
  }
}

export const actionLikedPosts = (posts) => {
  return {
    type: LIKED_POSTS,
    posts
  }
}

export const actionUnlikePost = (posts) => {
  return {
    type: UNLIKE_POST,
    posts
  }
}

// -------------------------------------------------------------------- HELPER


const normalizePosts = (posts) => {
  const normalized = {};

  posts.forEach((post) => {
    post.post.user = post.user
    delete post.user
    normalized[post.post.id] = post;
  });
  return normalized;
};

const normalizeLikedPost = (posts) => {
  let normalize = {};
  posts.forEach(post => {
    normalize[post.id] = post;
  })
  return normalize;
}




// -------------------------------------------------------------------- THUNK

export const thunkGetPosts = () => async (dispatch) => {
  const response = await fetch("api/post/feed");

  if (response.ok) {
    const data = await response.json();
    let res = normalizePosts(data.posts);
    dispatch(actiongGetPosts(res));
    return;
  }
};

export const thunkCreatePost = (post, user_id) => async (dispatch) => {
  const response = await fetch(`/api/post/feed/newPost/${user_id}`, {
    method: "POST",
    body: post,
  });

  if (response.ok) {
    const post = await response.json();
    dispatch(actionCreatePost(post.Post));
    dispatch(thunkGetPosts())
    return post;
  }
};

export const thunkUpdatePost = ({postId, updatePost}) => async (dispatch) => {
  const response = await fetch(`/api/post/feed/updatePost/${postId}`, {
    method:'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ updatePost })
  })

  if (response.ok) {
    const post = await response.json();
    dispatch(actionUpdatePost(postId, post.post))
    dispatch(thunkGetPosts())
    return post
  }
}

export const thunkDeletePost = ({postId, userId}) => async (dispatch) => {
  const response = await fetch(`/api/post/feed/deletePost/${postId}`, {method:'DELETE'})

  if (response.ok) {
    const deletedPost = await response.json();
    dispatch(actionDeletePost(postId, deletedPost))
    dispatch(thunkGetComments())
    return deletedPost;
  }

  return { error: 'There was a problem deleting the post', statusCode: response.status };
}

export const thunkLikedPosts = (userId) => async (dispatch) => {
  const response = await fetch(`/api/post/feed/likedPosts/${userId}`)

  if (response.ok) {
    const allUserposts = await response.json();
    console.log('THUNK RESPONSE', allUserposts)

    const normalized = normalizeLikedPost(allUserposts.likedPosts)
    dispatch(actionLikedPosts(normalized))
    return;
  }
}

export const thunkLikePost = (postId, userId) => async (dispatch) => {
  const response = await fetch(`/api/post/feed/likePost/${postId}/${userId}`, {method:'POST'})

  if (response.ok) {
    dispatch(thunkLikedPosts(userId))
  }
}

export const thunkUnlikePost = (postId, userId) => async (dispatch) => {
  const response = await fetch(`/api/post/feed/unlikePost/${postId}/${userId}`, {method:'PUT'}) 
  if (response.ok) {
    dispatch(thunkLikedPosts(userId))
    return;
  }
}

// -------------------------------------------------------------------- INITIAL STATE

const initialState = {
  allPosts: {},
  likedPosts: {}
};

// -------------------------------------------------------------------- REDCUER

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, allPosts: { ...action.posts } };
    case CREATE_POST:
      const createState = { ...state, allPosts: { ...state.allPosts }}
      createState.allPosts[action.post.id] = { post: action.post}
      return createState
    case UPDATE_POST:
      return { ...state, allPosts: { ...state.allPosts, [action.postId]: { post: action.post} } };
    case DELETE_POST:
      const newState = { ...state, allPosts: { ...state.allPosts } }
      delete newState.allPosts[action.postId]
      return newState
    case LIKED_POSTS:
      return { ...state, likedPosts: { ...action.posts } }
    default:
      return state;
  }
};

export default postsReducer;
