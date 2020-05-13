import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { HttpService } from '../shared/http.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user$: User = new User();

  constructor(
    public router: Router,
    public http: HttpService,
    public auth: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.auth.user$.getValue()._id) {
      return true;
    }

    if(state.url === '/sign-in') {

      if(this.auth.token) {
        return this.http.get<User>('me').pipe(map(res => {
          if(res.body && res.body._id) this.auth.user$.next(new User(res.body));
          return true;
        }), catchError(() => {  
          return of(true);
        }));
      } else return true;

    }
    
    else {

      if(this.auth.token) {
        return this.http.get<User>('me').pipe(map(res => {
          if(res.body && res.body._id) {
            this.auth.user$.next(new User(res.body));
            return true;
          } else this.router.navigate(['/sign-in']);
        }), catchError(() => {
          this.router.navigate(['/sign-in']);
          return of(false);
        }));
      } else this.router.navigate(['/sign-in']);

    }

  }

}
