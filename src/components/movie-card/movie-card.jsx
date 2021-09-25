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
          <Card.Img src={movie.ImagePath} />
          <br></br>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>
            {movie.Description}
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Info</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
