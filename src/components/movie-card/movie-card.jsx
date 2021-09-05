import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Img src={movie.ImagePath} />
          <br></br>
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
