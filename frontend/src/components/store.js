import { createStore } from 'redux';

var Reducer = function(state, action){
    if (state === undefined){
        state=[];
    }
    if (action.type === "GET_NEWS"){
        return {...state, news: action.news}
    }
    return state;
};


var store = createStore(Reducer);



export default store;