import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from '../app/movies/movies.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const router: Routes = [
  { path: '', redirectTo: "/dashboard", pathMatch: "full" },
  { path: "movies", component: MoviesComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "detail/:id", component: MovieDetailComponent }
]

@NgModule({
  imports: [
    //CommonModule
    RouterModule.forRoot(router)
  ],
  //declarations: []
  exports: [RouterModule]
})
export class AppRoutingModule { }
