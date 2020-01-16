import axios from 'axios';

/**
 * Se il token esiste nel localStorage
 * viene inserito negli header delle
 * chiamate api fatte con axios
 * @param {String} token
 */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defualts.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
