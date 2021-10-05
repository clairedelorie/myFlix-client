import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card border="light" style={{ width: "18rem" }} className=" movieCard">
        <Card.Body>
          <Card.Img src={movie.ImagePath} width="254" height="377" />
          <br></br>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>
            {movie.Description}
            <br></br>
            <Link
              className="justify-content-center"
              to={`/movies/${movie._id}`}
            >
              <Button variant="primary">Info</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
