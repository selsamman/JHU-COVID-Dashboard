import React, {useState} from 'react';
import './App.css';
import {importData} from './data/timeseries';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Spinner, Row, Col, Table} from 'react-bootstrap';
import {Dashboard} from "./components/Dashboard";

function App() {
  const [loadingState, setLoadingState] = useState("loading");
  importData().then( (state) => setLoadingState(state));
  return (
      <Container fluid="md">
          <Row>
              {loadingState === 'loading' &&
                  <Col>
                      <Row>
                          <Col xs={5}>&nbsp;</Col>
                          <Col xs={2} float="center" style={{marginTop: 20}}>
                              <Spinner animation="border"/>
                          </Col>
                          <Col xs={5}>&nbsp;</Col>
                      </Row>
                  </Col>
              }
              {loadingState === 'loaded' && <Dashboard />}
              {loadingState === 'error'&& <span>Data could not be loaded </span>}
          </Row>
      </Container>
  );
}

export default App;
