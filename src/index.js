import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducer, trace } from 'redux-capi';
import { applyMiddleware, createStore, compose } from 'redux'
import ReduxThunk from 'redux-thunk';
import initialState from "./capi/initialState";
import { widgetsAPI} from "./capi";
import { getStateFromURL} from "./config/urlParameters";
import ReactBreakpoints, {withBreakpoints} from "react-breakpoints";
import {Col, Navbar, Row} from "react-bootstrap";
import {DashboardHeader} from "./components/DashboardHeader";
//trace.log = t => console.log(t);
const store = createStore(reducer, getStateFromURL() || initialState, applyMiddleware(ReduxThunk))
widgetsAPI.mount(store);
const AppWithBreakPoints = withBreakpoints(App);


ReactDOM.render(
  <React.StrictMode>
      <ReactBreakpoints breakpoints={{single: 1, table: 992}}>
          <DashboardHeader/>
         <AppWithBreakPoints />
      </ReactBreakpoints>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
