import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Sagas from './sagas/gn';

const saga = createSagaMiddleware();

const Reducer = function(state, action) {
  if (!state) {
    state = { authorlist: [], page: 1 };
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
    return { ...state, resultOfUserCreate: action.data };
  }
  if (action.type === 'AUTHOR_GET') {
    return { ...state, authorlist: [...state.authorlist, action.data] };
  }
  if (action.type === 'AUTHOR_INFO') {
    return { ...state, authorInfo: action.data };
  }


  return state;
};


const store = createStore(
  Reducer,
  applyMiddleware(saga),
);

saga.run(Sagas.gettotal);
saga.run(Sagas.getnews);
saga.run(Sagas.tryauthorize);
saga.run(Sagas.trysendingnew);
saga.run(Sagas.trysendingava);
saga.run(Sagas.tryregistrate);
saga.run(Sagas.trygetauthor);
saga.run(Sagas.tryGetAuthorInfo);
saga.run(Sagas.trySearch);




export default store;
