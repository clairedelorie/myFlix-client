import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Button, Card, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

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
      .get("https://boiling-savannah-13307.herokuapp.com/users/${username}", {
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
      .get("https://boiling-savannah-13307.herokuapp.com/users/${username}", {
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
        "https://boiling-savannah-13307.herokuapp.com/users/${username}/movies/${movie._id}",
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
      .put("https://boiling-savannah-13307.herokuapp.com/users/${username}", {
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
      <Row className="profile-view d-flex ">
        <Accordion defaultActiveKey="0" className="custom-accordion">
          <Accordion.Item style={{ backgroundColor: "black" }} eventKey="0">
            <Accordion.Header className="custom-header">
              <h3 className="profile text-dark">My Profile</h3>
            </Accordion.Header>
            <Accordion.Body className="full-white w-100">
              <Form
                noValidate
                validated={validated}
                className="update-form"
                onSubmit={(e) => this.handleUpdate(e)}
              >
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <FloatingLabel controlId="username" label="Username">
                      <Form.Control
                        type="text"
                        value={this.state.Username}
                        onChange={(e) =>
                          this.setState({ Username: e.target.value })
                        }
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <FloatingLabel controlId="password" label="Password">
                        <Form.Control
                          type="password"
                          value={this.state.Password}
                          onChange={(e) =>
                            this.setState({ Password: e.target.value })
                          }
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FloatingLabel controlId="email" label="Email address">
                        <Form.Control
                          type="email"
                          value={this.state.Email}
                          onChange={(e) =>
                            this.setState({ Email: e.target.value })
                          }
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBirthdate">
                      <FloatingLabel
                        controlId="birthdate"
                        label="Date of Birth"
                      >
                        <Form.Control
                          type="date"
                          value={this.state.Birthdate}
                          onChange={(e) =>
                            this.setState({ Birthdate: e.target.value })
                          }
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
                <Card.Body>
                  <Button
                    className="mx-3 mt-2"
                    type="submit"
                    variant="outline-light"
                  >
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
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item style={{ backgroundColor: "black" }} eventKey="1">
            <Accordion.Header className="text-light full-black mt-md-5">
              <h3 className="m-auto black-text">Favorites</h3>
            </Accordion.Header>
            <Accordion.Body className="text-center full-black" sm={12} md={6}>
              {(FavoriteMovies || []).length === 0 && (
                <div className="text-center text-light m-auto">
                  You don`t have favorite movies yet!
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
                              <img
                                className="movieCard"
                                src={movie.ImagePath}
                              />
                            </Col>
                          </Row>
                        </Col>
                      );
                    }
                  })}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
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
