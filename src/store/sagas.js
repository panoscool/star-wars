import { all, fork, put, delay, takeEvery } from 'redux-saga/effects';
import { PEOPLE_GET, PLANETS_GET, AUTH_CHECK } from './actionTypes';
import { setPeople, setPlanets, setLoading, setError, setAuth } from './actions';
import apiRequest from '../api';

function* watchAuth() {
  yield takeEvery(AUTH_CHECK, function* ({ creds }) {
    const { person, username, password } = creds;
    const auth = person?.name === username && person?.birth_year === password;
    yield put(setLoading(true));
    yield delay(500);
    yield put(setAuth(auth));
    yield put(setLoading(false));
  });
}

function* watchPeople() {
  yield takeEvery(PEOPLE_GET, function* ({ name }) {
    yield put(setLoading(true));
    try {
      const res = yield apiRequest(`/people/?search=${name}`);
      yield put(setPeople(res.data.results[0]));
    } catch (error) {
      console.error(error);
      yield put(setError(error));
    } finally {
      yield put(setLoading(false));
    }
  });
}

function* watchPlanets() {
  yield takeEvery(PLANETS_GET, function* ({ name }) {
    yield put(setLoading(true));
    try {
      const res = yield apiRequest(`/planets/?search=${name}`);
      yield put(setPlanets(res.data.results));
    } catch (error) {
      console.error(error);
      yield put(setError(error));
    } finally {
      yield put(setLoading(false));
    }
  });
}

export default function* sagas() {
  yield all([fork(watchPeople), fork(watchPlanets), fork(watchAuth)]);
}
