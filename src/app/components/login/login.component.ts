import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _auttheticationService: AuthenticationService
  ) { }

  userName: string;
  password: string;
  accessDenied = false;
  loading = false;

  ngOnInit() {
  }

  onSignIn(): void {
    this.loading = true;
    this._auttheticationService.login(this.userName, this.password).subscribe({
      next: token => console.log(token),
      complete: () => {
        this.loading = false;
        this._router.navigateByUrl('/customers', {replaceUrl: true});
      },
      error: error => {
        this.loading = false;
        this.accessDenied = true;
        console.error(error);
      }
    });
  }

  @HostListener('window:keydown.enter')
  onEnter(): void {
    this.onSignIn();
  }
}
