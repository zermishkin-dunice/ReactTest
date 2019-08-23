import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { get_total, get_news, try_authorize, try_sending_new, try_sending_ava } from './sagas/gn';

const saga_get_total = createSagaMiddleware();

var Reducer = function (state, action) {
    if (state === undefined) {
        state = { page: 1, };
    }
    if (action.type === "GET_NEWS") {
        return { ...state, news: action.news }
    }
    if (action.type === "PAGE") {
        return { ...state, page: action.page }
    }
    if (action.type === "GET_TOTAL_WRITE_TO_STORE") {
        return { ...state, total: action.total }
    }
    if (action.type === "GET_USER") {
        return { ...state, user: action.data }
    }
    if (action.type === "LOG_OUT") {
        return { ...state, user: action.data }
    }
    if (action.type === "RESULT_OF_SENDING") {
        return { ...state, result_of_sending: action.data }
    }
    if (action.type === "AVATAR") {
        return { ...state, avatar: action.data }
    }
    return state;
};


var store = createStore(Reducer,
    applyMiddleware(saga_get_total)
);

saga_get_total.run(get_total);
saga_get_total.run(get_news);
saga_get_total.run(try_authorize);
saga_get_total.run(try_sending_new);
saga_get_total.run(try_sending_ava);

export default store;