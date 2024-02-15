import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';

function GeolocationSection() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isSupported = 'geolocation' in navigator;

    // Debug
    //console.log("[Init Geolocation] Check if device + browser contains geolocation support.", isSupported);

    // Check if geolocation is in the browser.
    if (isSupported) {
      const timerId = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
          (error) => setError('Error: ' + error.message));
      }, 1000);

      return (() => clearInterval(timerId));
    }
    else {
      setError('Error: Geolocation not supported in this browser/device.');
    }
  }, []);

  return (
    <Row className="d-flex flex-row justify-content-center">
      {location ? RenderLocation(location.latitude, location.longitude) : RenderError(error)}
    </Row>
  );
}

function RenderLocation(latitude, longitude) {
  return (
    <Col className="col-12 d-flex flex-column align-items-start">
      <p className="mt-0 mb-2 fs-6" style={{ width: "fit-content" }}>
        <span className="fw-bold">Latitude: </span>{latitude}
      </p>
      <p className="my-0 fs-6" style={{ width: "fit-content" }}>
        <span className="fw-bold">Longitude: </span>{longitude}
      </p>
    </Col>
  );
}

function RenderError(error) {
  return (
    <Col className="col-12 d-flex flex-column align-items-start">
      <p className="mt-0 mb-2 fs-6 text-danger" style={{ width: "fit-content" }}>
        {error}
      </p>
    </Col>
  );
}

function App() {
  return (
    <Container fluid className="d-flex flex-column align-items-center">
      {/* --------------------- */}
      {/* Title */}
      <Row className="d-flex flex-row justify-content-center">
        <Col className="col-12 d-flex flex-row justify-content-center">
          <h1 style={{ width: "fit-content" }}>Geolocation App</h1>
        </Col>
      </Row>
      {/* --------------------- */}
      {/* Body */}
      <GeolocationSection />
      {/* --------------------- */}
    </Container>
  )
}

export default App
