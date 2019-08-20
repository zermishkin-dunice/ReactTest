import { createStore } from 'redux';

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
    if (action.type === "GET_TOTAL"){
        return {...state, total: action.total}
    }
    return state;
};


var store = createStore(Reducer);



export default store;