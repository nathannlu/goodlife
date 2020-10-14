import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
	const requestBody = {
		query: `
			mutation {
				createUser(userInput: {
					email: "${userData.email}"
					password: "${userData.password}"
					password2: "${userData.password2}"
				}) {
					_id
					token
					email
				}
			}
		`
	}

	axios
		.post('/graphql', requestBody)
		.then(res => {
			const { data } = res;

			if (data.errors) {
				console.log(data.errors[0].message);
			} else {
				console.log(data);
				const { _id, token, email } = data.data.createUser;

				// Set token to localStorage
				localStorage.setItem("jwtToken", token);

				// Set current user
				dispatch(setCurrentUser({
					_id,
					email
				}));
			}
		})
		.catch(err => {
			console.log(err);
		})
};
// Login - get user token
export const loginUser = userData => dispatch => {
	const requestBody = {
		query: `
			query {
				login(email: "${userData.email}", password: "${userData.password}") {
					_id
					token
					email
				}
			}
		`
	}

	axios
		.post('/graphql', requestBody)
		.then(res => {
			const { data } = res;

			if (data.errors) {
				console.log(data.errors[0].message);
			} else {
				console.log(data);
				const { _id, token, email } = data.data.login;

				// Set token to localStorage
				localStorage.setItem("jwtToken", token);

				// Set current user
				dispatch(setCurrentUser({
					_id,
					email
				}));
			}
		})
		.catch(err => {
			console.log(err);	
		})
};

export const authenticate = token => dispatch => {
	if(!!token) {
		const requestBody = {
			query: `
				query {
					verifyToken(token: "${token}") {
						_id
						email
					}
				}
			`
		}

		axios
			.post('/graphql', requestBody)
			.then(res => {
				const { data } = res;

				const user = data.data.verifyToken;
				console.log(data);

				if(user) {
					setCurrentUser(user);
				} else {
					logoutUser();
				}
			})
			.catch(() => {
				dispatch(logoutUser())
			})
	} else {
		dispatch(logoutUser())
	}
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded 
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
