import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://boiling-savannah-13307.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

<<<<<<< Updated upstream
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
=======
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  getMovies(token) {
    axios
      .get("https://boiling-savannah-13307.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(register) {
    this.setState({
      register,
>>>>>>> Stashed changes
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
