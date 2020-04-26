import React, { Component } from "react";
import { getMovies } from "../Starter Code/Starter Code/services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  deleteMovies(movie) {
    //console.log("The movie is :" + movie._id);
    const deletedMovie = this.state.movies.filter((i) => i._id !== movie._id);
    this.setState({ movies: deletedMovie });
  }

  render() {
    return (
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
    );
  }
}

export default Movies;
