import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Button, Card, Form, Col, Row } from "react-bootstrap";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
      this.getFavorites(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    return axios
      .get(`https://boiling-savannah-13307.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.Favorites,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getFavorites(token) {
    return axios
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

  handleRemove(movie) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return axios
      .delete(
        `https://boiling-savannah-13307.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: function (status) {
            return status < 500;
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert(movie.title + " was removed from favorites!");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleDeleteUser(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return axios
      .delete(
        `https://boiling-savannah-13307.herokuapp.com/users/${username}`,
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
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .put(`https://boiling-savannah-13307.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthdate: this.state.Birthyear,
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
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setUsername(input) {
    this.state.Username = input;
  }

  setPassword(input) {
    this.state.Password = input;
  }

  setEmail(input) {
    this.state.Email = input;
  }

  setBirthdate(input) {
    this.state.Birthdate = input;
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={this.state.Username}
            onChange={(e) => this.setState({ Username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={this.state.Password}
            onChange={(e) => this.setState({ Password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={this.state.Email}
            onChange={(e) => this.setState({ Email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control
            type="date"
            value={this.state.Birthdate}
            onChange={(e) => this.setState({ Birthdate: e.target.value })}
          />
        </Form.Group>

        <Card.Body>
          <Button className="mx-3 mt-2" type="submit" variant="outline-light">
            Update
          </Button>
          <Button
            className="mx-3 mt-2"
            variant="outline-danger"
            onClick={(e) => this.handleDeleteUser(e)}
          >
            Delete Account
          </Button>
        </Card.Body>

        <Card style={{ width: "18rem" }}>
          <Card.Title>Card Title</Card.Title>
          <Card.Body className="text-center full-black" sm={12} md={6}>
            {(FavoriteMovies || []).length === 0 && (
              <div className="text-center text-light m-auto">
                No favorites yet!
              </div>
            )}
            <div className="favorite-movies d-flex justify-content-center ">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    FavoriteMovies.find(
                      (favoriteMovie) => favoriteMovie === movie._id
                    )
                  ) {
                    return (
                      <Col className="text-center justify-content-center">
                        <Row className="text-light" key={movie._id}>
                          <Col
                            className="m-auto image-container-profile"
                            sm={12}
                            md={6}
                            lg={5}
                          >
                            <img className="movieCard" src={movie.ImagePath} />
                          </Col>
                        </Row>
                      </Col>
                    );
                  }
                })}
            </div>
          </Card.Body>
        </Card>
      </Form>
    );
  }
}

ProfileView.propTypes = {
  username: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }),
};
