import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { server } from '../News';
import { newsonpage } from '../News';

const cookies = new Cookies();

// Actions from Saga's
const requestTotal = data => ({ type: 'GET_TOTAL_WRITE_TO_STORE', total: data });

const request_news = data => ({ type: 'GET_NEWS', news: data });

const getting_token = data => {
  const string = data.toString();
  if (string.includes('error')) {
    return { type: 'GET_USER', data };
  }
  cookies.set('token', data.token);
  cookies.set('first_name', data.first_name);
  cookies.set('last_name', data.last_name);
  cookies.set('avatar', data.avatar);
  cookies.set('username', data.username);
  cookies.set('id', data.id);

  return { type: 'GET_USER', data };
};

const answer_for_creating_new = data => ({ type: 'RESULT_OF_SENDING', data });

const answer_for_ava = data => {
  cookies.set('avatar', data.avatar, { path: '/' });
  return { type: 'AVATAR', data: data.avatar };
};

const answer_for_creating_author = data => ({ type: 'USER_CREATE', data });

const getting_author = data => ({ type: 'AUTHOR_GET', data });


// Sagas' watchers
export function* get_total() {
  yield takeEvery('GET_TOTAL_BY_USER', getTotalAsync);
}
export function* get_news(data) {
  yield takeEvery('GET_NEWS_ON_PAGE', getNewsAsync);
}

export function* try_authorize(data) {
  yield takeEvery('AUTORIZE_PAGE', autorizeAsync);
}

export function* try_sending_new(data) {
  yield takeEvery('SENDING_NEW', sending_new_async);
}

export function* try_sending_ava(data) {
  yield takeEvery('SENDING_AVATAR', sending_ava_async);
}

export function* try_registrate(data) {
  yield takeEvery('REGISTRATE_PAGE', registrate_async);
}

export function* try_get_author(data) {
  yield takeEvery('GET_AUTHOR_ON_PAGE', author_async);
}


// Sagas' workers
export function* getTotalAsync() {
  const data = yield call(() => axios.get(`${server}api/news/total/`));
   yield put(requestTotal(data.data));
}

export function* getNewsAsync(data) {
  const response = yield call(() => axios.get(`${server}api/news/`, { params: { page: data.data.page, newsonpage: data.data.newsonpage } }));
  yield put(request_news(response.data));
}

export function* autorizeAsync(info) {
  const data = yield call(() => axios.post(`${server}api/auth`, qs.stringify({ username: info.data.login, password: info.data.pass })));
  yield put(getting_token(data.data));
}

export function* sending_new_async(info) {
  const data = yield call(() => {
    const fd = new FormData();
    fd.append('text', info.data.text);
    fd.append('title', info.data.title);
    fd.append('token', info.data.token);
    fd.append('file', info.data.file);
    return axios.post(`${server}api/news/add`, fd);
  });
  yield put(answer_for_creating_new(data.data));
  yield put({ type: "GET_NEWS_ON_PAGE", data: { page: info.data.page, newsonpage: newsonpage }});
}

export function* sending_ava_async(info) {
  const data = yield call(() => {
    const fd = new FormData();
    fd.append('file', info.data.file);
    fd.append('token', info.data.token);
    return axios.post(`${server}api/ava/change`, fd);
  });


  yield put(answer_for_ava(data.data));
}

export function* registrate_async(info) {
  const data = yield call(() => axios.post(`${server}api/author/add`, qs.stringify({
    username: info.data.username,
    password: info.data.password,
    firstname: info.data.firstname,
    lastname: info.data.lastname,
    email: info.data.email,
  })));
  yield put(answer_for_creating_author(data.data));
}

export function* author_async(info) {
  let id = info.data;
  const data = yield call(() => axios.get(`${server}api/author/${id}`));
  let fullname = data.data.first_name + " " + data.data.last_name;
  yield put(getting_author(data.data));
}