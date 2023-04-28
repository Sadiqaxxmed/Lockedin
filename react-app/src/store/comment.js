// -------------------------------------------------------------------- CONSTANT

const GET_COMMENTS      = 'COMMENT/GET_COMMENTS';
const CREATE_COMMENT    = 'COMMENT/CREATE_COMMENT';
const UPDATE_COMMENT    = 'COMMENT/UPDATE_COMMENT';
const DELETE_COMMENT    = 'COMMENT/DELETE_COMMENT';



// -------------------------------------------------------------------- ACTION

export const actionGetComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

export const actionCreateComments = (comment) => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};

export const actionUpdateComment = (commentId, comment) => {
  return {
    type: UPDATE_COMMENT,
    commentId,
    comment
  };
};

export const actionDeleteComment = (commentId, comment) => {
  return {
    type: UPDATE_COMMENT,
    commentId,
    comment
  };
};

// -------------------------------------------------------------------- HELPER

const normalizeComments = (comments) => {
  const normalized = {};
  comments.forEach((comment) => {
    comment.comment.user = comment.user
    delete comment.user
    normalized[comment.comment.id] = comment;
  });
  return normalized;
};

// -------------------------------------------------------------------- THUNK

export const thunkGetComments = () => async (dispatch) => {
  const response = await fetch(`/api/post/feed/comments`);

  if (response.ok) {
    const data = await response.json();
    let res = normalizeComments(data.comments);
    dispatch(actionGetComments(res));
    return;
  }
};

export const thunkCreateComment = (comment, userId, postId) => async (dispatch) => {

    const response = await fetch(`/api/post/feed/${postId}/newComment/${userId}`, {
        method: "POST",
        body:
          comment

      }
    );

    if (response.ok) {
      const comment = await response.json();
      dispatch(actionCreateComments(comment.comment));
      dispatch(thunkGetComments())
      return comment;
    }
  };

  export const thunkUpdateComment = (postId, commentId, updateComment) => async (dispatch) => {

    const response = await fetch(`/api/post/feed/updateComment/${commentId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {updateComment} )
      }
    );

    if (response.ok) {
      const comment = await response.json();
      dispatch(actionUpdateComment(commentId, comment.comment));
      dispatch(thunkGetComments())
      return comment;
    }
  };

  export const thunkDeleteComment = ({commentId, userId}) => async (dispatch) => {
    const response = await fetch(`/api/post/feed/deleteComment/${commentId}`, {method:'DELETE'})

    if (response.ok) {
      const deletedComment = await response.json()
      dispatch(actionDeleteComment(commentId, deletedComment))
    }

  }

// -------------------------------------------------------------------- INITIAL STATE

const initialState = {
  allComments: {},
};

// -------------------------------------------------------------------- REDCUER

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, allComments: { ...action.comments } };
    case CREATE_COMMENT:
      const createState = { ...state, allComments: { ...state.allComments } }
      createState.allComments[action.comment.id] = { comment: action.comment }
      return createState
    case UPDATE_COMMENT:
      return { ...state, allComments: { ...state.allComments, [action.commentId]: {comment: action.comment}} };
    case DELETE_COMMENT:
      const deleteState = { ...state, allComments: { ...state.allComments } }
      delete deleteState.allComments.comment[action.commentId]
      return deleteState
    default:
      return state;
  }
};

export default commentsReducer;
