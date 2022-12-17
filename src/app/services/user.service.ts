import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null);
  public currentUser$ = this.currentUser.asObservable();

  private apiUrl: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
  }

  getCurrent(): Observable<null | User> {
    const token = localStorage.getItem("token");

    if (!token) {
      return of(null);
    }

    return this.httpClient.get<User>(`${this.apiUrl}/users/me`).pipe(
      tap(user => {
        this.currentUser.next(user)
      })
    );
  }

  clearCurrentUser() {
    this.currentUser.next(null);
  }
}
