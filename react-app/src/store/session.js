// -------------------------------------------------------------------- CONSTANT

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_SINGLE_USER = "session/GET_SINGLE_USER"

const UPDATE_ABOUT    = 'session/UPDATE_ABOUT';
const DELETE_ABOUT    = 'session/DELETE_ABOUT';


// -------------------------------------------------------------------- ACTION

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const actionSingleUser = (user) => {
	return {
		type: GET_SINGLE_USER,
		user
	}
  }

export const actionUpdateAbout = (userId, about) => {
    return {
      type: UPDATE_ABOUT,
      userId,
      about
    };
  };

export const actionDeleteAbout = (userId, about) => {
	return {
		type: DELETE_ABOUT,
		userId,
		about
	}
}

// -------------------------------------------------------------------- SESSION

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (firstname, lastname, email, occupation, profileImage, headerImage, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			firstname,
			lastname,
			email,
			occupation,
			profileImage,
			headerImage,
			password
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

// -------------------------------------------------------------------- THUNK

export const thunkGetSingleUser = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`)
  
	if (res.ok) {
		const user = await res.json();
		dispatch(actionSingleUser(user))
		return user;
	}
  }

export const thunkUpdateAbout = (userId, updateAbout) => async (dispatch) => {

    const response = await fetch(`/api/users/about/${userId}/update`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {updateAbout} )
      }
    );

    if (response.ok) {
      const about = await response.json();
      dispatch(actionUpdateAbout(userId, about));
      dispatch(thunkGetSingleUser(userId))
      return about;
    }
  };

export const thunkDeleteAbout = ({userId}) => async (dispatch) => {
	const deletedAbout = null;

	const response = await fetch(`/api/users/about/${userId}/delete`, {
		method:'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ deletedAbout })
	}
	)

	console.log('response', response)

	if (response.ok) {
		const deletedAbout = await response.json();
		dispatch(actionDeleteAbout(userId, deletedAbout))
		dispatch(thunkGetSingleUser())
		return deletedAbout;
	}

	return { error: 'There was a problem deleting the about', statusCode: response.status };
}

// -------------------------------------------------------------------- INITIAL STATE

const initialState = { 
	user: null,
	singleUser: {}
 };

// -------------------------------------------------------------------- REDCUER

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case GET_SINGLE_USER: {
			const newState = { ...state }
			newState.singleUser = action.user
			return newState
		}
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
