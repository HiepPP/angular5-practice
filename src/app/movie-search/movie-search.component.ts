import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Movie } from '../../models/movie';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]>;
  private searchSubject = new Subject<string>(); 
  constructor(private movieService : MovieService) { }
  
  ngOnInit() {
    this.movies$ = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchString: string)=> this.movieService.searchMovie(searchString))
    )
  }


  search(searchString: string): void{
    this.searchSubject.next(searchString);
  }
}
