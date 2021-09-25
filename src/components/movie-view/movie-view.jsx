import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export default class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view mt-5 m-auto ">
        <Col md={12} lg={6} className="movie-poster ">
          <img className="w-100" src={movie.ImagePath} />
        </Col>

        <Col md={12} lg={6} className="movie-body my-auto">
          <div className="movie-title">
            <span className="label"> </span>
            <span className="value">{movie.Title}</span>
          </div>

          <div className="movie-genre">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
            <span className="value"></span>
          </div>

          <div className="movie-description">
            <span className="label"> </span>
            <span className="value">{movie.Description}</span>
          </div>

          <div className="movie-director">
            <span className="value">Directed by: </span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>

          <Button
            varient="primary"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Image: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
  }).isRequired,
};
