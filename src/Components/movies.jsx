import React, { Component } from "react";
import { getMovies } from "../Starter Code/Starter Code/services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import ListGroup from "./common/listGroup";
import { getGenres } from "../Starter Code/Starter Code/services/fakeGenreService";
import MoviesTable from "../Components/moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    genres: [],
    currentPage: 1,
    sortColumn: [{ path: "title", order: "asc" }],
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleDelete = (movie) => {
    const deletedMovie = this.state.movies.filter((i) => i._id !== movie._id);
    this.setState({ movies: deletedMovie });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (path) => {
    console.log(path);
    const sortColumn = [...this.state.sortColumn];
    if (sortColumn.path === path)
      sortColumn.order(sortColumn.order === "asc") ? "desc" : "asc";
    else {
      (sortColumn.path = path), (sortColumn.order = "asc");
    }
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
    } = this.state;
    if (count === 0) return <p>There are no movies in the database</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          ></ListGroup>
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>
          <MoviesTable
            onSort={this.handleSort}
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          ></MoviesTable>
          <Pagination
            itemsCount={filtered.length}
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
