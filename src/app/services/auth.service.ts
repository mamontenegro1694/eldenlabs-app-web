import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  public isAuth$: Observable<boolean> = this.userService.currentUser$.pipe(
    switchMap(currentUser => {
      return (currentUser != null) ? of(currentUser) : this.userService.getCurrentUser();
    }),
    map(Boolean)
  );

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  login(email: string, password: string): Observable<User | null> {
    return this.httpClient.post<string>(`${this.apiUrl}/auth`, {
      Email: email,
      Password: password
    }, {
      headers: {
        Accept: "application/json"
      }
    }).pipe(
      switchMap((token) => {
        this.setToken(token);

        return this.userService.getCurrentUser();
      })
    );
  }

  logout(): void {
    this.clearToken();
    this.userService.clearCurrentUser();
  }

  getToken(): null | string {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}
