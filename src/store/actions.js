import {
  PEOPLE_GET,
  PEOPLE_SET,
  PLANETS_GET,
  PLANETS_SET,
  LOADING_SET,
  ERROR_SET,
  AUTH_CHECK,
  AUTH_SET,
} from './actionTypes';
import store from './configureStore';

export const setAuth = (state) => {
  return {
    type: AUTH_SET,
    state,
  };
};

export const checkAuth = ({ username, password }) => {
  const person = store.getState().people;
  return {
    type: AUTH_CHECK,
    creds: { person, username, password },
  };
};

export const getPeople = (name) => {
  return {
    type: PEOPLE_GET,
    name,
  };
};

export const setPeople = (people) => {
  return {
    type: PEOPLE_SET,
    people,
  };
};

export const getPlanets = (name) => {
  return {
    type: PLANETS_GET,
    name,
  };
};

export const setPlanets = (planets) => {
  return {
    type: PLANETS_SET,
    planets,
  };
};

export const setLoading = (loading) => {
  return {
    type: LOADING_SET,
    loading,
  };
};

export const setError = (error) => {
  return {
    type: ERROR_SET,
    error,
  };
};
