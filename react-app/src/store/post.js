// -------------------------------------------------------------------- CONSTANT

const GET_POSTS     = "POST/GET_POSTS";
const CREATE_POST   = "POST/CREATE_POST";
const UPDATE_POST   = "POST/UPDATE_POST";


// -------------------------------------------------------------------- ACTION

export const actiongGetPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts,
  };
};

export const actionCreatePost = (post) => {
  return {
    type: CREATE_POST,
    post,
  };
};

export const actionUpdatePost = (post) => {
  return {
    type: UPDATE_POST,
    post
  }
}
// -------------------------------------------------------------------- HELPER

const normalizePosts = (posts) => {
  const normalized = {};

  posts.forEach((post) => {
    normalized[post.id] = post;
  });
  return normalized;
};

// -------------------------------------------------------------------- THUNK

export const thunkGetPosts = () => async (dispatch) => {
  const response = await fetch("api/post/feed");

  if (response.ok) {
    const allPosts = await response.json();
    const normalized = normalizePosts(allPosts.posts);
    dispatch(actiongGetPosts(normalized));
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
    dispatch(actionCreatePost(post));
    return post;
  }
};

export const thunkUpdatePost = ({postId,  updatePost}) => async dispatch => {
  const response = await fetch(`/api/post/feed/updatePost/${postId}`, {
    method:'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ updatePost })
  })

  if (response.ok) {
    const updatedPost = await response.json();
    dispatch(actionUpdatePost(updatedPost))
    return updatedPost;
  }
}

// -------------------------------------------------------------------- INITIAL STATE

const initialState = {
  allPosts: {},
};

// -------------------------------------------------------------------- REDCUER

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, allPosts: { ...action.posts } };
    case CREATE_POST: {
      const newState = { ...state };
      newState.allPosts = { ...state.allPosts, [action.post.id]: action.post };
      return newState;
    }
    default:
      return { ...state };
  }
};

export default postsReducer;
