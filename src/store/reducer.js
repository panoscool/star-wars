import { PEOPLE_SET, PLANETS_SET, LOADING_SET, ERROR_SET, AUTH_SET } from './actionTypes';

const initState = {
  auth: false,
  loading: false,
  error: null,
  people: [],
  planets: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case PEOPLE_SET:
      return { ...state, people: action.people };
    case PLANETS_SET:
      return { ...state, planets: action.planets };
    case LOADING_SET:
      return { ...state, loading: action.loading };
    case ERROR_SET:
      return { ...state, error: action.error };
    case AUTH_SET:
      return { ...state, auth: action.state };
    default:
      return state;
  }
};

export default reducer;
