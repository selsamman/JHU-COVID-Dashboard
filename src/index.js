import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducer } from 'redux-capi';
import { applyMiddleware, createStore, compose } from 'redux'
import ReduxThunk from 'redux-thunk';
import initialState from "./capi/initialState";
import { widgetsAPI } from "./capi";

const store = createStore(reducer, initialState, applyMiddleware(ReduxThunk))
widgetsAPI.mount(store);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
