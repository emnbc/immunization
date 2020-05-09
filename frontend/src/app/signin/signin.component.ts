import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { HttpService } from '../shared/http.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  loading: boolean = false;
  error: boolean = false;

  authData: User = {
    _id: null,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    birthDate: null,
    registerDate: null
  };

  constructor(
    public auth: AuthService,
    public http: HttpService,
    public router: Router
  ) {
    this.auth.user$.subscribe(user => {
      if(user && user._id) {
        this.router.navigate(['/']);
      }
    })
  }

  login() {
    this.loading = true;
    this.error = false;
    this.http.login(this.authData).subscribe(res => {
      if(res.token) {
        this.auth.setTokenToStorage(res.token);
        this.router.navigate(['/']);
      } else {
        this.error = true;
      }
    }, () => {
      this.error = true;
      this.loading = false;
    });
  }

}
