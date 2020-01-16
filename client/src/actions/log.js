import axios from 'axios';
import { GET_LOGS, GET_LOG, ADD_LOG, LOG_ERROR } from './types';

/// GET LOGS
export const getLogs = () => async dispatch => {
  try {
    const res = await axios.get('/api/logs');
    dispatch({
      type: GET_LOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/// GET LOG
export const getLog = id => async dispatch => {
  try {
    const res = await axios.get(`/api/logs/${id}`);

    dispatch({
      type: GET_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

/// ADD Log
export const addLog = (text, type) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ text, type });
    console.log(body);
    const res = await axios.post('/api/logs', body, config);
    console.log(res);
    dispatch({
      type: ADD_LOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
