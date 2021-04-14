import { all, fork, put, delay, takeEvery } from 'redux-saga/effects';
import { PEOPLE_GET, PLANETS_GET, LOGIN, LOGOUT } from './actionTypes';
import { setPeople, setPlanets, setLoading, setError, setAuth } from './actions';
import apiRequest from '../api';
import history from '../history';

function* watchAuth() {
  yield takeEvery(LOGIN, function* ({ creds }) {
    const { person, username, password } = creds;
    const auth = person?.name === username && person?.birth_year === password;
    const error = !auth ? 'Username or password is incorrect' : null;
    yield localStorage.setItem('auth', auth);
    yield put(setLoading(true));
    yield delay(1000);
    yield put(setAuth(auth));
    yield put(setLoading(false));
    yield history.push('/planets');
    yield put(setError(error));
  });

  yield takeEvery(LOGOUT, function* () {
    yield localStorage.removeItem('auth');
    yield put(setAuth(false));
    yield history.push('/');
  });
}

function* watchPeople() {
  yield takeEvery(PEOPLE_GET, function* ({ name }) {
    yield put(setLoading(true));
    try {
      const res = yield apiRequest(`/people/?search=${name}`);
      const character = res.data.results.find((n) => n.name === name);
      yield put(setPeople(character));
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
