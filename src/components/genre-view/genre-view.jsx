import React from "react";
import propTypes from "prop-types";
import { Button, Container, Row, Col } from "react-bootstrap";

import "./genre-view.scss";

export function GenreView({ genre, onBackClick }) {
  return (
    <Container className="mt-5 genre-view">
      <Col>
        <Row className="text-center genre-name">
          <h1>
            <span className="value">{genre.Name}</span>
          </h1>
        </Row>
        <Row className="genre-description">
          <span className="value">{genre.Description}</span>
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

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }).isRequired,
};
