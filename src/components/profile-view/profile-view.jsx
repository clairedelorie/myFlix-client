import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Row, Button, Card } from "react-bootstrap";

// import "./profile-view.scss";

export default class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      Favorites: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    axios
      .get("https://boiling-savannah-13307.herokuapp.com/users/${username}", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favorites: response.data.Favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemove(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .delete(
        "https://boiling-savannah-13307.herokuapp.com/users/${username}/movies/${movie._id}",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert(movie.title + " was removed from favorites!");
        this.getUser();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDelete(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .delete(
        "https://boiling-savannah-13307.herokuapp.com/users/${username}",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .put("https://boiling-savannah-13307.herokuapp.com/users/${username}", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthdate: newBirthdate ? newBirthdate : this.state.Birthdate,
        },
      })
      .then((response) => {
        alert("Updated Profile!");
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthdate: response.data.Birthdate,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;

    const favoriteMovies = movies.filter((m) => {
      return this.state.Favorites.includes(m._id);
    });

    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h2>Favorite Movies</h2>
          <Card.Body>
            {favoriteMovies.length === 0 && (
              <div className="text-center">Empty.</div>
            )}

            <div className="favorites-movies ">
              {favoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    favoriteMovies.find((favMovie) => favMovie === movie._id)
                  ) {
                    return (
                      <CardDeck className="movie-card-deck">
                        <Card
                          className="favorite-item card-content"
                          style={{ width: "16rem" }}
                          key={movie._id}
                        >
                          <Card.Img
                            style={{ width: "18rem" }}
                            className="movieCard"
                            variant="top"
                            src={movie.ImageURL}
                          />
                          <Card.Body>
                            <Card.Title className="movie-card-title">
                              {movie.Title}
                            </Card.Title>
                            <Button
                              size="sm"
                              className="profile-button remove-favorite"
                              variant="primary"
                              value={movie._id}
                              onClick={(e) =>
                                this.removefavoriteMovie(e, movie)
                              }
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="section">Update Profile</h1>
          <Card.Body>
            <Form
              className="update-form"
              onSubmit={(e) =>
                this.handleUpdate(
                  e,
                  this.Username,
                  this.Password,
                  this.Email,
                  this.Birthdate
                )
              }
            >
              <Form.Group controlId="formUpdateUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formUpdatePassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formUpdateEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formUpdateBirthdate">
                <Form.Label>Birthdate:</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="00-00-0000"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
              <h3>Delete your Account</h3>
              <Card.Body>
                <Button variant="danger" onClick={(e) => this.handleDelete(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    );
  }
}
ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Favorites: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,
};
