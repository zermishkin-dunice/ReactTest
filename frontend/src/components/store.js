import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { get_total, get_news, try_authorize, try_sending_new, try_sending_ava, try_registrate, try_get_author } from './sagas/gn';

const saga_get_total = createSagaMiddleware();

const Reducer = function(state, action) {
  if (state === undefined) {
    state = { page: 1, authorlist: [], };
  }
  if (action.type === 'GET_NEWS') {
    return { ...state, news: action.news };
  }
  if (action.type === 'PAGE') {
    return { ...state, page: action.page };
  }
  if (action.type === 'GET_TOTAL_WRITE_TO_STORE') {
    return { ...state, total: action.total };
  }
  if (action.type === 'GET_USER') {
    return { ...state, user: action.data };
  }
  if (action.type === 'LOG_OUT') {
    return { ...state, user: action.data };
  }
  if (action.type === 'RESULT_OF_SENDING') {
    return { ...state, resultofsending: action.data };
  }
  if (action.type === 'AVATAR') {
    return { ...state, avatar: action.data };
  }
  if (action.type === 'USER_CREATE') {
    return { ...state, user_create_result: action.data };
  }
  if (action.type === 'AUTHOR_GET') {
    console.log(action.data);
    return { ...state, authorlist:[...state.authorlist, action.data] };
  }
  

  return state;
};


const store = createStore(
  Reducer,
  applyMiddleware(saga_get_total),
);

saga_get_total.run(get_total);
saga_get_total.run(get_news);
saga_get_total.run(try_authorize);
saga_get_total.run(try_sending_new);
saga_get_total.run(try_sending_ava);
saga_get_total.run(try_registrate);
saga_get_total.run(try_get_author);

export default store;
