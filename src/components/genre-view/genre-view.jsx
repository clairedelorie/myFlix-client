import React from "react";
import propTypes from "prop-types";
import Button from "react-bootstrap";

import "./genre-view.scss";

export default class GenreView extends React.Component {
  render() {
    const { movies, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <h1>
            <span className="value">{movies.Genre.Name}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{movies.Genre.Description}</span>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }).isRequired,
};
