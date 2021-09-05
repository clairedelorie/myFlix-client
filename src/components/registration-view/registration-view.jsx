import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

import "./registration-view.scss";

export default function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://boiling-savannah-13307.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Something went wrong!");
      });
  };

  return (
    <Container>
      <Col xs={12} md={8} lg={6} className="d-flex mx-auto">
        <Row className="d-flex mx-auto mt-5 justify-content-center">
          <div className="text-center mt-5 login-view">
            <h2>Create a myFlix Account</h2>

            <Form>
              <Form.Group controlId="formGroupUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGroupPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGroupBirthdate">
                <Form.Control
                  type="date"
                  placeholder="00-00-0000"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </Form.Group>

              <Button varient="danger" onClick={handleSubmit}>
                Sign up!
              </Button>
            </Form>
          </div>
        </Row>
      </Col>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
  }),
};
