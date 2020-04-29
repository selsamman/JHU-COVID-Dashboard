import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { reducer, trace } from 'redux-capi';
import { applyMiddleware, createStore, compose } from 'redux'
import ReduxThunk from 'redux-thunk';
import initialState from "./capi/initialState";
import { widgetsAPI} from "./capi";
import ReactBreakpoints, {withBreakpoints} from "react-breakpoints";
import {getInitialState} from "./config/localstorage";
import ReactGA from 'react-ga';

const trackingId = "UA-131145833-2"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId, {gaOptions: {siteSpeedSampleRate: 100}});
ReactGA.pageview(window.location.pathname + window.location.search);

//trace.log = t => console.log(t);

const store = createStore(reducer, getInitialState(initialState), applyMiddleware(ReduxThunk))
widgetsAPI.mount(store);
const AppWithBreakPoints = withBreakpoints(App);

ReactDOM.render(
  <React.Fragment>
      <ReactBreakpoints breakpoints={{xs: 0, sm: 576, md: 768, lg: 992, xl: 1200}}>
         <AppWithBreakPoints />
      </ReactBreakpoints>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
