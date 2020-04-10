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
import { getStateFromURL} from "./config/urlParameters";
import ReactBreakpoints, {withBreakpoints} from "react-breakpoints";
import {Col, Navbar, Row, Container} from "react-bootstrap";
import {DashboardHeader} from "./components/DashboardHeader";

//trace.log = t => console.log(t);
const store = createStore(reducer, getStateFromURL() || initialState, applyMiddleware(ReduxThunk))
widgetsAPI.mount(store);
const AppWithBreakPoints = withBreakpoints(App);


ReactDOM.render(
  <React.StrictMode>
      <ReactBreakpoints breakpoints={{single: 1, table: 992}}>
         <AppWithBreakPoints />
      </ReactBreakpoints>
  </React.StrictMode>,
  document.getElementById('root')
);

/*
const TestApp = () => {
    const [width, setWidth] = useState();
    return (
        <div ref={ el => el && setWidth(el.getBoundingClientRect().width) }
             style={{backgroundColor: "#808080", height: 400}}>
            {width}
        </div>
    );
}
ReactDOM.render(
    <Container fluid="xl">
        <TestApp></TestApp>
    </Container>,
    document.getElementById('root')
);
*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
