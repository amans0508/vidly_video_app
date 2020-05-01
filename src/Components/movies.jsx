import React, { Component } from "react";
import { getMovies } from "../Starter Code/Starter Code/services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  deleteMovies(movie) {
    const deletedMovie = this.state.movies.filter((i) => i._id !== movie._id);
    this.setState({ movies: deletedMovie });
  }

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <React.Fragment>
        <p>Showing {count} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>In Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.deleteMovies(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
