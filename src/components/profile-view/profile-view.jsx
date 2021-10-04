import "./profile-view.scss";
import React from "react";
import axios from "axios";
import moment from "moment";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";

export class ProfileView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      UsernameError: "",
      PasswordError: "",
      EmailError: "",
      BirthdayError: "",
    };

    //when user submits a change to the form, change user information
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      Username: event.target.value,
    });
  }

  onPasswordChange(event) {
    this.setState({
      Password: event.target.value,
    });
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value,
    });
  }

  onBirthdayChange(event) {
    this.setState({
      Birthday: event.target.value,
    });
  }

  //when update form is submitted, PUT action with API
  handleUpdateUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    let validated = this.formValidation();
    if (validated) {
      axios
        .put(
          `https://boiling-savannah-13307.herokuapp.com/users/${username}`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.props.setUser(response.data);
          alert("Your information has been updated!");
        })
        .catch((e) => {
          console.log("Error updating user information");
        });
    }
  };

  formValidation() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValid = true;
    if (!(this.state.Username && this.state.Username.length > 4)) {
      UsernameError.notValidUsername =
        "Username must be at least 4 characters.";
      isValid = false;
    }
    if (!(this.state.Password && this.state.Password.length > 5)) {
      PasswordError.notValidPassword =
        "Password must be at least 6 characters.";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes("@"))) {
      EmailError.notValidEmail = "Please enter a valid email address.";
      isValid = false;
    }
    if (!this.state.Birthday) {
      BirthdayError.noBirthday = "Please enter your date of birth.";
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    });
    return isValid;
  }

  //allow a user to delete their account
  handleDeleteUser = (e) => {
    e.preventDefault();
    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("user");

      axios
        .delete(
          `https://boiling-savannah-13307.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          alert("Your account has been deleted.");
          this.props.setUser(null);
          window.open(`/`, "_self");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  render() {
    const { FavoriteMovies } = this.state;
    const { movies, user } = this.props;
    const { UsernameError, PasswordError, EmailError, BirthdayError } =
      this.state;

    const username = user.Username;
    const email = user.Email;
    const favoriteMovies = user.FavoriteMovies;
    const birthday = moment(user.Birthday).format("YYYY-MM-DD");

    return (
      <div className="profile-view_wrapper">
        <h3 className="profile-view_headers"> Hello, {username}!</h3>

        <Form className="profile-form">
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label>Email</Form.Label>
            </Col>
            <Col sm="9">
              {Object.keys(EmailError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {EmailError[key]}
                  </div>
                );
              })}
              <Form.Control
                required
                type="text"
                placeholder={email}
                onChange={this.onEmailChange}
              />
            </Col>
          </Row>
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label>Username</Form.Label>
            </Col>
            <Col sm="9">
              {Object.keys(UsernameError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {UsernameError[key]}
                  </div>
                );
              })}
              <Form.Control
                required
                type="text"
                placeholder={username}
                onChange={this.onUsernameChange}
              />
            </Col>
          </Row>
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label>Password</Form.Label>
            </Col>
            <Col sm="9">
              {Object.keys(PasswordError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {PasswordError[key]}
                  </div>
                );
              })}
              <Form.Control
                required
                type="password"
                placeholder=""
                onChange={this.onPasswordChange}
              />
            </Col>
          </Row>
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label>Birthday</Form.Label>
            </Col>
            <Col sm="9">
              {Object.keys(BirthdayError).map((key) => {
                return (
                  <div className="form-validation-error" key={key}>
                    {BirthdayError[key]}
                  </div>
                );
              })}
              <Form.Control
                required
                type="date"
                defaultValue={birthday}
                onChange={this.onBirthdayChange}
              />
            </Col>
          </Row>
          <Form.Group className="profile-form_buttons">
            <Button
              type="button"
              variant="primary"
              className="profile-update-button"
              onClick={this.handleUpdateUser}
            >
              Update Information
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={this.handleDeleteUser}
            >
              Delete Account
            </Button>
          </Form.Group>
        </Form>

        <h3 className="profile-view_headers">Favorite Movies</h3>
        {favoriteMovies.length === 0 && (
          <p>You have not added any movies to your list of favorites yet!</p>
        )}
        <Row xs={1} sm={2} md={3} className="g-4">
          {favoriteMovies.length > 0 &&
            favoriteMovies.map((movieId) => {
              const movie = movies.find((m) => m._id == movieId);

              return (
                <Col key={movie._id}>
                  <Link to={`/movies/${movie._id}`}>
                    <Card
                      key={movie._id}
                      variant="light"
                      className="profile-view_movie-card"
                    >
                      <Card.Img variant="top" src={movie.Image} />
                      <Card.Body>
                        <Card.Title>
                          <h5 className="movie-card_title">{movie.Title} </h5>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, { setUser })(ProfileView);
