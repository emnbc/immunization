import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = new User();
    this.auth.user$.subscribe(user => {
      this.user = new User(user);
      console.log(user);
    });
  }

  logOut() {
    this.auth.logOut();
    this.router.navigate(['/sign-in']);
  }

}
