import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { get_total, get_news } from './sagas/gn';

const saga_get_total = createSagaMiddleware()

var Reducer = function(state, action){
    if (state === undefined){
        state={page: 1,};
    }
    if (action.type === "GET_NEWS"){
        return {...state, news: action.news}
    }
    if (action.type === "PAGE"){
        return {...state, page: action.page}
    }
    if (action.type === "GET_TOTAL_WRITE_TO_STORE"){
        return {...state, total: action.total}
    }
    return state;
};


var store = createStore(Reducer, 
    applyMiddleware(saga_get_total)
);

saga_get_total.run(get_total);
saga_get_total.run(get_news);


export default store;