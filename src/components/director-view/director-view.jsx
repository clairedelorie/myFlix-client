import React from "react";
import propTypes from "prop-types";
import Button from "react-bootstrap/Button";

import "./director-view.scss";
import { Col, Container, Row } from "react-bootstrap";

export function DirectorView({ director, onBackClick }) {
  return (
    <Container className="mt-5 director-view">
      <Col>
        <Row className=" text-center director-name">
          <h1>
            <span className="value">{director.Name}</span>
          </h1>
        </Row>

        <Row className="director-bio">
          <span className="value">{director.Bio}</span>
        </Row>

        <Row className="director-birthdate">
          <span className="value">{director.Birthdate}</span>
        </Row>

        <Button
          variant="danger"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Col>
    </Container>
  );
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birthdate: propTypes.instanceOf(Date),
  }).isRequired,
};
