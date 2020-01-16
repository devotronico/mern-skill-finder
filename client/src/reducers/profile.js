import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_PROFILES_FILTERED,
  UPDATE_FAVORITE,
  UPDATE_INTERVIEWED,
  UPDATE_STARS,
  UPDATE_WORKED,
  UPDATE_NOTE
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_PROFILES:
    case GET_PROFILES_FILTERED:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case UPDATE_FAVORITE:
      return {
        ...state,
        profile: { ...state.profile, isFavorite: payload.isFavorite }
      };
    case UPDATE_INTERVIEWED:
      return {
        ...state,
        profile: { ...state.profile, isInterviewed: payload.isInterviewed }
      };
    case UPDATE_STARS:
      return {
        ...state,
        profile: { ...state.profile, stars: payload.stars }
      };
    case UPDATE_WORKED:
      return {
        ...state,
        profile: { ...state.profile, worked: payload.worked }
      };
    case UPDATE_NOTE:
      return {
        ...state,
        profile: { ...state.profile, note: payload.note }
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    default:
      return state;
  }
}
