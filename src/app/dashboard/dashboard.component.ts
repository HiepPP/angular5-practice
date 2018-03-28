import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovie();
  }
  movies: Movie[] = [];

  getMovie(){
      this.movieService.getMovies().subscribe(m => this.movies = m.slice(0,4));
  }
}
