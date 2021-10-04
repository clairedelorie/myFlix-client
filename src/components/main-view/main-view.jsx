import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import { setUser, setMovies, setFilter } from "../../actions/actions";

import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import RegistrationView from "../registration-view/registration-view";
import ProfileView from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import MoviesList from "../movies-list/movies-list";

import {
  Row,
  Col,
  Navbar,
  Nav,
  NavbarBrand,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = { loggedIn: false };
  }

  componentDidMount() {
    const accesstoken = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    if (accesstoken !== null) {
      this.setState({ loggedIn: true });
      Promise.all([
        this.getUser(username, accesstoken),
        this.getMovies(accesstoken),
      ]).catch((e) => {
        console.error(e);
        alert("Something went wrong ...");
      });
    }
  }

  getMovies(token) {
    return axios
      .get("https://boiling-savannah-13307.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      });
  }

  getUser(username, token) {
    return axios
      .get(`https://boiling-savannah-13307.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      });
  }

  onRegister(user) {
    this.setState({
      user,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    this.props.setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.props.setUser(null);
  }

  render() {
    const { loggedIn } = this.state;
    const { movies, user } = this.props;

    if (loggedIn && movies.length == 0 && user == null)
      return <div>Loading...</div>;

    return (
      <Router>
        <Navbar
          className="custom-navbar"
          collapseOnSelect
          expand="xxl"
          sticky="top"
          variant="light"
        >
          <Container>
            <NavbarBrand>
              <Link to={"/"}>
                <h1 className="myFlix-title">myFlix</h1>
              </Link>
            </NavbarBrand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {loggedIn && user && (
              <Navbar.Collapse
                id="responsive-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="nav-link">
                  <Link className="custom-link mx-3" to={`/`}>
                    Movies
                  </Link>
                  <Link className="custom-link mx-3" to={`/directors`}>
                    Directors
                  </Link>
                  <Link className="custom-link mx-3" to={`/genres`}>
                    Genres
                  </Link>
                  <Link
                    className="custom-link mx-3"
                    to={`/users/${user.Username}`}
                  >
                    Profile
                  </Link>
                </Nav>
                <Button
                  className="logout-btn mx-3"
                  variant="secondary"
                  onClick={() => {
                    this.onLoggedOut();
                  }}
                >
                  Logout
                </Button>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>

        <Row className="main-view justify-content-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;

              return <MoviesList movies={movies} />;
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/users/:Username"
            render={({ history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView
                      onLoggedIn={(data) => this.onLoggedIn(data)}
                      onRegisterClick={(register) =>
                        this.onRegisterClick(register)
                      }
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col>
                  <ProfileView history={history} movies={movies} />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    FavoriteMovies={user.FavoriteMovies}
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/genres/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/genres"
            render={() => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  {movies
                    .reduce(
                      (genres, movie) =>
                        genres.find((g) => g.Name == movie.Genre.Name)
                          ? genres
                          : [...genres, movie.Genre],
                      []
                    )
                    .map((g) => (
                      <Card className="m-4">
                        <Card.Body>
                          <Card.Title className="text-center">
                            {g.Name}
                          </Card.Title>
                          <Card.Text className=" text-center">
                            {g.Description}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            exact
            path="/directors"
            render={() => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  {movies
                    .reduce(
                      (directors, movie) =>
                        directors.find((d) => d.Name == movie.Director.Name)
                          ? directors
                          : [...directors, movie.Director],
                      []
                    )
                    .map((d) => (
                      <Card className="m-4">
                        <Card.Body>
                          <Card.Title className="text-center">
                            {d.Name}
                          </Card.Title>
                          <Card.Text className=" text-center">
                            {d.Bio}
                          </Card.Text>
                          <Card.Text>{d.Birthdate}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setUser, setMovies, setFilter })(
  MainView
);
