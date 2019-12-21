import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from '../actions/types';

import setAuthToken from '../utils/setAuthToken';

// Invia il token al server se

/**
 * [a] Se il token è presente nel localstorage
 * viene inserito negli headers per le request api al server.
 * Dal server la rotta `/api/auth` è gestita
 * nel file `root\routes\api\auth.js` script[1].
 * [b] Fa una request al server con il token
 * [c] Se il token inviato è valido si ottengono i dati dell'user
 *    che vengono passati nella prop `payload`
 */
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // [a]
  }

  try {
    const res = await axios.get('/api/auth'); // [a]
    dispatch({ type: USER_LOADED, payload: res.data }); // [c]
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

/// REGISTER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

/// LOGIN
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

/// LOGOUT / CLEAR_PROFILE
export const logout = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
