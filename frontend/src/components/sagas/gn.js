import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import qs from 'qs';

// Actions from Saga's
const requestTotal = (data) => {
    return { type: 'GET_TOTAL_WRITE_TO_STORE', total: data }
  };

const request_news = (data) => {
    return { type: "GET_NEWS", news: data }
}

const getting_token = (data) => {
    return { type: "GET_TOKEN", token: data }
}


// Sagas' watchers
export function* get_total() {
    yield takeEvery('GET_TOTAL_BY_USER', getTotalAsync);
  }
export function* get_news(page) {
    yield takeEvery('GET_NEWS_ON_PAGE', getNewsAsync);
}

export function* try_authorize(data) {
    console.log("Try_autorize_watcher. Data: ", data);
    yield takeEvery('AUTORIZE_PAGE', autorizeAsync);
}

// Sagas' workers
export function* getTotalAsync() {
    const data = yield call(() => {
        return axios.get('http://localhost:8000/get/news/total/')})
    yield put(requestTotal(data.data));
}

export function* getNewsAsync(page, news_on_page) {
    const data = yield call(() => {
        return axios.get('http://localhost:8000/get/news/', {params: {page: page.page, news_on_page: news_on_page}})});
    yield put(request_news(data.data))
}

export function* autorizeAsync(info){
    const data = yield call(() => {
        return axios.post('http://localhost:8000/get/auth2', qs.stringify({username: info.data.login, password: info.data.pass}));  } );  
    yield put(getting_token(data.data));
}