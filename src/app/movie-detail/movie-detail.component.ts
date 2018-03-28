import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() phim: Movie;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private locaiton: Location) { }

  ngOnInit() {
    this.getRouteDetail();
  }

  getRouteDetail() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieFromId(id).subscribe(x => this.phim = x);
  }

  goBack() {
    this.locaiton.back();
  }

  save() {
    this.movieService.updateMovie(this.phim).subscribe((updateMovie) => console.log(updateMovie));
  }
}
