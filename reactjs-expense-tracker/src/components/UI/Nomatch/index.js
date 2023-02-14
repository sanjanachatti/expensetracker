import React from "react";
// Importing alert and container from bootstrap
import { Alert, Container } from "react-bootstrap";

// Export function for Page not found 
export default function Nomatch() {
  return (
    //   Giving a bootstrap class to the Container
    <Container className="py-3" style={{ marginTop: "60px" }}>
        {/* Giving a bootstrap class to the Alert */}
      <Alert variant="danger" className="text-center">
        Page Not Found
      </Alert>
    </Container>
  );
}
