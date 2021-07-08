import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './App/redux/redusers/rootReducer';
import history from './history';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const app = (
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
)
ReactDOM.render(
  app,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
