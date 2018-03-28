import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../movie.service';
//import { fakeMovies } from '../fake-movie'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  constructor(private moviesService: MovieService) {

  }
  ngOnInit() {
    this.getMoviesList();
  }
  getMoviesList() {
    //this.movies = this.moviesService.getMovies();
    this.moviesService.getMovies().subscribe(
      (updatedMovies) => this.movies = updatedMovies
    );
  }
  movies: Movie[];
  status = true;
  selectedMovie: Movie;

  onSelect(movie) {
    this.selectedMovie = movie;
    console.log(`${JSON.stringify(this.selectedMovie)}`)
  }

  addNewMovie(name: string, releaseYear: number) {
    name = name.trim();
    if (Number.isNaN(releaseYear) || !name || Number(releaseYear) == 0) {
      alert("please fill all information");
      return;
    }
    let newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear = Number(releaseYear);
    this.moviesService.createMovie(newMovie).subscribe(
      newMovie => this.movies.push(newMovie)
    )
  }

  deleteMovie(id: number) {
    this.moviesService.deleteMovie(id).subscribe(x => {
      console.log("deleted");
      this.movies = this.movies.filter(x => x.id !== id)
    });
  }
}
