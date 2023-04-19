// -------------------------------------------------------------------- CONSTANT

const GET_POSTS = 'POST/GET_POSTS'


// -------------------------------------------------------------------- ACTION

export const actiongGetPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts
  }
}

// -------------------------------------------------------------------- HELPER

const normalizePosts = posts => {
  const normalized = {}

  posts.forEach(post => {
    normalized[post.id] = post
  })
  return normalized
}

// -------------------------------------------------------------------- THUNK

export const thunkGetPosts = () => async dispatch => {
  const response = await fetch('api/post/feed')

  if (response.ok) {
    const allPosts = await response.json()
    const normalized = normalizePosts(allPosts.posts)
    dispatch(actiongGetPosts(normalized))
    return
  }
}

// -------------------------------------------------------------------- INITIAL STATE

const initialState = {
  allPosts: {}
}


// -------------------------------------------------------------------- REDCUER

const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_POSTS:
      return { ...state, allPosts: { ...action.posts }}
    default: return { ...state }
  }
}

export default postsReducer
