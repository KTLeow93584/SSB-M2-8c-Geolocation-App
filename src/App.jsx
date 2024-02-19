import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import { GetLocationContext, LocationContextProvider } from './contexts/LocationContext.jsx';
import { GetErrorContext, ErrorContextProvider } from './contexts/ErrorContext.jsx';

function GeolocationSection() {
  const locationContext = GetLocationContext();
  const error = GetErrorContext();
  const isSupported = 'geolocation' in navigator;

  if (!isSupported)
    error.setErrorMessage('Error: Geolocation not supported in this browser/device.');

  useEffect(() => {
    // Debug
    //console.log("[Init Geolocation] Check if device + browser contains geolocation support.", isSupported);
    let timerId = null;

    if (isSupported) {

      // Check if geolocation is in the browser.
      timerId = setInterval(() => getGeolocationData(locationContext.setLocation, error.setErrorMessage), 1000);
    }

    return (() => {
      if (timerId !== null)
        clearInterval(timerId)
    });
  });

  return (
    <Row className="d-flex flex-row justify-content-center mt-3">
      {
        locationContext.location !== null ?
          RenderLocation(locationContext.location.latitude, locationContext.location.longitude) :
          RenderError(error.errorMessage)
      }
    </Row>
  );
}

function getGeolocationData(setLocationCallback = null, onLocationFailedCallback = null) {
  // Debug
  console.log("On Fetch Geolocation Attempt.");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Debug
      console.log("On Successful Fetch Geolocation Attempt.");
      if (setLocationCallback !== null)
        setLocationCallback({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    },
    (error) => {
      // Debug
      console.log("On Failed Fetch Geolocation Attempt.", error);

      if (setLocationCallback !== null)
        setLocationCallback(null);

      if (onLocationFailedCallback !== null)
        onLocationFailedCallback('Error: ' + error.message);
    });
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

function Header({ isGeolocationEnabled, onToggleGeolocation }) {
  const location = GetLocationContext();
  const error = GetErrorContext();

  return (
    <>
      {/* --------------------- */}
      {/* Title */}
      <Row className="d-flex flex-row justify-content-center">
        <Col className="col-12 d-flex flex-row justify-content-center">
          <h1 style={{ width: "fit-content" }}>Geolocation App</h1>
        </Col>
      </Row>
      {/* --------------------- */}
      {/* Body */}
      <Button onClick={
        () => {
          // On Triggered On -> Get Initial Data.
          if (isGeolocationEnabled === false)
            getGeolocationData(location.setLocation, error.setErrorMessage);
          onToggleGeolocation();
        }
      }>
        {isGeolocationEnabled ? "Turn Off" : "Turn On"}
      </Button >
    </>
  );
}

function App() {
  const [isGeolocationEnabled, setGeolocationEnabled] = useState(false);

  function onToggleGeolocation() {
    setGeolocationEnabled(!isGeolocationEnabled);
  }

  return (
    <LocationContextProvider>
      <ErrorContextProvider>
        <Container fluid className="d-flex flex-column align-items-center">
          <Header isGeolocationEnabled={isGeolocationEnabled} onToggleGeolocation={onToggleGeolocation} />
          {
            isGeolocationEnabled ?
              <GeolocationSection /> :
              <p className="mt-3">Press the Toggle Button to start Geolocation Tracking.</p>
          }
          {/* --------------------- */}
        </Container>
      </ErrorContextProvider>
    </LocationContextProvider>
  )
}

export default App
