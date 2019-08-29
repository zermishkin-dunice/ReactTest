import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { server, newsonpage } from '../../config/config';


const request = ({
  url = '',
  pathname = '/api/',
  method = 'GET',
  query = '',
  headers = {},
  data,
}) => new Promise(
  (resolve, reject) => {
    const options = {
      url: url + pathname + query,
      method,
      headers,
      withCredentials: true,
    };
    if (data) { options.data = data; }
    axios(options)
      .then(response => response.data)
      .then((rdata) => {
        if (!rdata.errors) resolve(rdata);
        reject(Array.isArray(rdata.errors) ? rdata.errors[0] : rdata.errors);
      })
      .catch(e => reject(e));
  },
);

export default request;

const cookies = new Cookies();

// Actions from Saga's
const requestTotal = data => ({ total: data, type: 'GET_TOTAL_WRITE_TO_STORE' });
const requestnews = data => ({ news: data, type: 'GET_NEWS' });
const gettingtoken = data => {
  const string = data.toString();


  if (string.includes('error')) {
    return { data, type: 'GET_USER' };
  }
  cookies.set('token', data.token);
  cookies.set('first_name', data.first_name);
  cookies.set('last_name', data.last_name);
  cookies.set('avatar', data.avatar);
  cookies.set('username', data.username);
  cookies.set('id', data.id);

  return { data, type: 'GET_USER' };
};

const answerforcreatingnew = data => ({ data, type: 'RESULT_OF_SENDING' });
const answerforava = data => {
  cookies.set('avatar', data.avatar, { path: '/' });

  return { data: data.avatar, type: 'AVATAR' };
};
const answerforcreatingauthor = data => ({ data, type: 'USER_CREATE' });
const gettingauthor = data => ({ data, type: 'AUTHOR_GET' });
const respAuthorInfo = data => ({ data, type: 'AUTHOR_INFO' });

//Saga's workers

export function *getTotalAsync() {
  //const data = yield call(() => axios.get(`${server}api/news/total/`));
  const response = yield call(request, {query: "news/total/"});

  yield put(requestTotal(response));
}

export function *getNewsAsync(data) {
  const {newsonpage, page} = data.data;

  //const response = yield call(() => axios.get(`${server}api/news/`, { params: dt }));
  const response = yield call(request, {pathname: "api/news?", query: qs.stringify({page,newsonpage})});
  yield put(requestnews(response));
}

export function *autorizeAsync(info) {
  const dt = qs.stringify({ password: info.data.pass, username: info.data.login });

  //const data = yield call(() => axios.post(`${server}api/auth`, qs.stringify(dt)));
  const response = yield call(request, {query: "auth", method: "POST", data: dt});

  yield put(gettingtoken(response));
}

export function *sendingnewasync(info) {
  const fd = new FormData();
    fd.append('text', info.data.text);
    fd.append('title', info.data.title);
    fd.append('token', info.data.token);
    fd.append('file', info.data.file);
  //const data = yield call(() => {return axios.post(`${server}api/news/add`, fd);
  const response = yield call(request, {query: "news/add", method: "POST", data: fd});
  yield put(answerforcreatingnew(response));
  yield put({ data: { newsonpage, page: info.data.page }, type: 'GET_NEWS_ON_PAGE' });
}

export function *sendingavaasync(info) {
  const fd = new FormData();
  fd.append('file', info.data.file);
  fd.append('token', info.data.token);
  //const data = yield call(() => {return axios.post(`${server}api/ava/change`, fd);});
  const response = yield call(request, {query: "ava/change", method: "POST", data: fd});
  yield put(answerforava(response));
}

export function *registrateasync(info) {
  const dt = qs.stringify({
    email: info.data.email,
    firstname: info.data.firstname,
    lastname: info.data.lastname,
    password: info.data.password,
    username: info.data.username,
  });
  //const data = yield call(() => axios.post(`${server}api/author/add`, dt));
  const response = yield call(request, {query: "author/add", method: "POST", data: dt});

  yield put(answerforcreatingauthor(response));
}

export function *authorasync(info) {
  const id = info.data;
  //const data = yield call(() => axios.get(`${server}api/author/${id}`));
  const response = yield call(request, {query: `author/${id}`});

  yield put(gettingauthor(response));
}

export function *authorInfoAsync(info) {
  const id = info.data;
  //const data = yield call(() => axios.get(`${server}api/author/${id}`));
  const response = yield call(request, {query: `author/${id}`});

  yield put(respAuthorInfo(response));
}

export function *searchAsync(info) {
  const {word, type} = info.data;
  //const data = yield call(() => axios.get(`${server}api/news/search/`, {params: {word, type}}));
  const response = yield call(request, {pathname: `api/news/search?`, query: qs.stringify({word,type})});


  yield put(requestnews(response));
}


// Sagas' watchers
export function *gettotal() {
  yield takeEvery('GET_TOTAL_BY_USER', getTotalAsync);
}
export function *getnews() {
  yield takeEvery('GET_NEWS_ON_PAGE', getNewsAsync);
}

export function *tryauthorize() {
  yield takeEvery('AUTORIZE_PAGE', autorizeAsync);
}

export function *trysendingnew() {
  yield takeEvery('SENDING_NEW', sendingnewasync);
}

export function *trysendingava() {
  yield takeEvery('SENDING_AVATAR', sendingavaasync);
}

export function *tryregistrate() {
  yield takeEvery('REGISTRATE_PAGE', registrateasync);
}

export function *trygetauthor() {
  yield takeEvery('GET_AUTHOR_ON_PAGE', authorasync);
}

export function *tryGetAuthorInfo() {
  yield takeEvery('GET_AUTHOR_INFO_PAGE', authorInfoAsync);
}

export function *trySearch() {
  yield takeEvery('SEARCH_PAGE', searchAsync);
}
