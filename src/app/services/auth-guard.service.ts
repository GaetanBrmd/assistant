import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { WebRequestService } from './web-request.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private webService: WebRequestService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      if (this.authService.isAuth) {
        resolve(true);
      } else {
        this.webService.get('user').subscribe(
          (resp: any) => {
            this.authService.isAuth = true;

            resolve(true);
          },
          (errorResp) => {
            this.router.navigate(['login']);

            resolve(false);
          }
        );
      }
    });
  }
}
