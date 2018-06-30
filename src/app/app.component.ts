import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  loggedin = false;

  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {
    _authenticationService.userAuthenticated$.subscribe(token => this.loggedin = true);
    _authenticationService.userUnauthenticated$.subscribe(() => {
      this.loggedin = false;
      this._router.navigateByUrl('/login', {replaceUrl: true});
    });
  }

  ngOnInit() {
    this.loggedin = !!this._authenticationService.getToken();
    if (!this.loggedin) {
      this._router.navigateByUrl('/login', {replaceUrl: true});

    }
  }

  onSignout() {
    this._authenticationService.signOut();
  }
}
