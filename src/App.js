import React, {useState} from 'react';
import './App.css';
import {importData} from './data/timeseries';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Spinner, Row} from 'react-bootstrap';
import {Dashboard} from "./components/Dashboard";

function App() {
  const [loadingState, setLoadingState] = useState("loading");
  importData().then( (state) => setLoadingState(state));
  return (
      <Container fluid="md">
          <Row>
              {loadingState === 'loading' && <Spinner animation="border" />}
              {loadingState === 'loaded' && <Dashboard />}
              {loadingState === 'error'&& <span>Data could not be loaded </span>}
          </Row>
      </Container>
  );
}

export default App;
