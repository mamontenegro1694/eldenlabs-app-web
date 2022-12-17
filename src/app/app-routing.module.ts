import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'measurements' },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
    canActivate: [LoggedGuard],
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'measurements',
    loadComponent: () => import('./pages/measurements/measurements.component').then(c => c.MeasurementsComponent),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
