import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { AttendenceComponent } from './pages/attendence/attendence.component';
import { HomeComponent } from './pages/home/home.component';
import { LocalizationComponent } from './pages/localization/localization.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieComponent } from './pages/movie/movie.component';
import { AuthGuard } from './_service/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'localization', component: LocalizationComponent, canActivate: [AuthGuard]},
      { path: 'attendence', component: AttendenceComponent, canActivate: [AuthGuard]},
      { path: 'movie', component: MovieComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
