import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://boiling-savannah-13307.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Container>
      <Col xs={12} md={8} lg={6} className="d-flex mx-auto">
        <Row className=" mx-auto mt-5 justify-content-center">
          <div className="text-center mt-5 login-view">
            <h1>Welcome to MyFlix</h1>

            <Form>
              <Form.Group className="m-2" controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="m-2" controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="secondary" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Form>

            <Col className="mt-5 w-100 ">
              <h4>Don't have an account?</h4>

              <Link to="/register">
                <Button
                  className="w-auto pb-2 py-0 "
                  varient="primary"
                  type="button"
                >
                  Sign up
                </Button>
              </Link>
            </Col>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
