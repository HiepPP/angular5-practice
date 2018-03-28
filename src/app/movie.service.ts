import { Injectable } from '@angular/core';
import { fakeMovies } from './fake-movie'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Movie } from '../models/movie';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, map, tap } from "rxjs/operators"
import { HttpHandler } from '@angular/common/http/src/backend';
import { error } from 'selenium-webdriver';
@Injectable()
export class MovieService {

  constructor(public messageService: MessageService, private http: HttpClient) { }

  private url: string = "http://localhost:3000/movies";

  movies: Movie[];
  movie: Movie;

  getMovies(): Observable<Movie[]> {
    this.messageService.add(`${new Date().toLocaleString()}.Get movie list`);
    //return of(fakeMovies);
    return this.http.get<Movie[]>(this.url).pipe(
      tap(x => this.movies = x),
      catchError(error => of(this.movies))
    )
  }
  getMovieFromId(id: number): Observable<Movie> {
    const url = `${this.url}/${id}`;
    //return of(this.movies.find(m => m.id == id))
    return this.http.get<Movie>(url).pipe(
      tap(movieResponse => this.movie = movieResponse),
      catchError(error => of(new Movie()))
    )
  }

  updateMovie(movie: Movie): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(`${this.url}/${movie.id}`, movie, httpOption).pipe(
      tap(updatedMovie => updatedMovie),
      catchError(error => of(new Movie))
    )
  }

  createMovie(newMovie: Movie): Observable<Movie> {
    const httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Movie>(this.url, newMovie, httpOption).pipe(
      tap(createdMovie => createdMovie),
      catchError(error => of(new Movie))
    )
  }

  deleteMovie(id: number): Observable<Movie> {
    const deleteUrl = `${this.url}/${id}`
    const httpOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<Movie>(deleteUrl, httpOption).pipe(
      tap(x => console.log("deleted")),
      catchError(error => of(null))
    )
  }

}
