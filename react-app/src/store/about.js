// -------------------------------------------------------------------- CONSTANT

// const GET_ABOUT     = 'ABOUT/GET_ABOUT';
const CREATE_ABOUT    = 'ABOUT/CREATE_ABOUT';
const UPDATE_ABOUT    = 'ABOUT/UPDATE_ABOUT';
const DELETE_ABOUT    = 'ABOUT/DELETE_ABOUT';

// -------------------------------------------------------------------- ACTION

export const actionUpdateComment = (commentId, comment) => {
    return {
      type: UPDATE_COMMENT,
      commentId,
      comment
    };
  };
  
// -------------------------------------------------------------------- HELPER

const normalize = (spots) => {
    const data = {};
    if (spots.Spots) {
        spots.Spots.forEach(spot => data[spot.id] = spot);
        return data;
    }
  }

// -------------------------------------------------------------------- THUNK

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

// -------------------------------------------------------------------- INITIAL STATE

const initialState = {
    userAbout: {},
  };