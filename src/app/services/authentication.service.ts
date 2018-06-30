import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentToken: string;
  private userAuthenticatedSource = new Subject<string>();
  userAuthenticated$ = this.userAuthenticatedSource.asObservable();
  private userUnauthenticatedSource = new Subject<string>();
  userUnauthenticated$ = this.userUnauthenticatedSource.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  getToken(): string {
    return this._currentToken;
  }

  userAutheticated(token: string) {
    this.userAuthenticatedSource.next(token);
  }

  userUnauthenticated() {
    this.userUnauthenticatedSource.next();
  }

  login(userName: string, password: string): Observable<string> {
    return this._http.post<string>('/api/login', {
      'userName': userName,
      'password': password
    }).pipe(
      tap(x => {
        this._currentToken = x;
        this.userAutheticated(x);
      })
    );
  }

  signOut(): void {
    this._currentToken = null;
    this.userUnauthenticated();
  }
}
