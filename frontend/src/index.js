import React from 'react';
import ReactDOM from 'react-dom';
import News from './components/News';
import UserPage from './components/UserPage';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={News} />
      <Route path="/users/:id" component={UserPage} />
    </Switch>
  </BrowserRouter>
</Provider>, document.getElementById('root'));

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
