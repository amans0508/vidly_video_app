import React, { Component } from "react";
import { getMovies } from "../Starter Code/Starter Code/services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroup from "./common/listGroup";
import { getGenres } from "../Starter Code/Starter Code/services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    genres: [],
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleGenreSelect = (genre) => {
    console.log(genre);
  };

  deleteMovies(movie) {
    const deletedMovie = this.state.movies.filter((i) => i._id !== movie._id);
    this.setState({ movies: deletedMovie });
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, pageSize, currentPage } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            textProperty="name"
            valueProperty="_id"
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <p>Showing {count} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>In Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
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
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Movies;
