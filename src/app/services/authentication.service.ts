import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _currentToken: string;

  constructor(
    private _http: HttpClient
  ) { }

  getToken(): string {
    return this._currentToken;
  }

  login(userName: string, password: string): Observable<string> {
    return this._http.post<string>('/api/login', {
      'userName': userName,
      'password': password
    }).pipe(
      tap(x => {
        this._currentToken = x;
      })
    );
  }
}
