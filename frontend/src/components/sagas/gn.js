import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';


// Actions from Saga's
const requestTotal = (data) => {
    return { type: 'GET_TOTAL_WRITE_TO_STORE', total: data }
  };

const request_news = (data) => {
    return { type: "GET_NEWS", news: data }
}


// Sagas' watchers
export function* get_total() {
    yield takeEvery('GET_TOTAL_BY_USER', getTotalAsync);
  }
export function* get_news(page) {
    console.log("from get_news:", page);
    yield takeEvery('GET_NEWS_ON_PAGE', getNewsAsync);
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