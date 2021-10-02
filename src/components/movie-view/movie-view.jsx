import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import "./movie-view.scss";

export default class MovieView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getFavorites(accessToken);
  }

  componentDidUpdate(FavoriteMovies) {
    const accessToken = localStorage.getItem("token");
    this.getFavorites(accessToken);
  }

  //get favorite movies
  getFavorites(token) {
    const username = localStorage.getItem("user");
    const FavoriteMovies = this.state;

    axios
      .get(`https://boiling-savannah-13307.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // when a user favorites a movie, add it to their favorites list via POST action to API
  addFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://boiling-savannah-13307.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  }

  // when a user clicks remove favorite, remove from favorites list via DELETE action to API
  removeFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(
        `https://boiling-savannah-13307.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {})
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies } = this.state;

    return (
      <Row className="movie-view mt-5 m-auto ">
        <Col md={12} lg={6} className="movie-poster ">
          <img className="w-100" src={movie.Image} />
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
          <div className="movie-buttons">
            <Button
              varient="primary"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
            {/*if this movie is already favorite, show the "remove favorite" button */}

            {FavoriteMovies.includes(movie._id) && (
              <Button
                className="movie-view_unfavorite-button"
                value={movie.id}
                onClick={(e) => this.removeFavorite(e, movie)}
              >
                Remove from Favorites
              </Button>
            )}
            {/*if this movie is NOT already favorite, show the "add favorite" button */}
            {FavoriteMovies.indexOf(movie._id) === -1 && (
              <Button
                className="movie-view_favorite-button"
                value={movie.id}
                onClick={(e) => this.addFavorite(e, movie)}
              >
                Add to Favorites
              </Button>
            )}
          </div>
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
  }),
  user: propTypes.shape({
    FavoriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
        Name: propTypes.string.isRequired,
      })
    ),
  }),
};
