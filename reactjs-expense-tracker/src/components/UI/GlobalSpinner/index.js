// Importing react 
import React from "react";

import { Container, Spinner, Row } from "react-bootstrap";

// // A resuable export function containing the global spinner, to be displayed when a page loads
export default function GlobalSpinner() {
  return (
    // Container from react bootstrap */}
    <Container fluid>
      {/* Row attributes from react bootstrap */}
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        {/* Spinner attributes from react bootstrap */}
        <Spinner
          as="span"
          animation="border"
          size="lg"
          variant="info"
          role="status"
        />
      </Row>
    </Container>
  );
}
