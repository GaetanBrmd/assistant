import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isAuth = false;

  constructor(private webService: WebRequestService, private router: Router) {}

  signIn(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.webService.login(email, password).subscribe(
        (resp: any) => {
          console.log(resp);
          this.isAuth = true;
          resolve();
        },
        (errorResp) => {
          console.error(
            'Oops, something went wrong getting the logged in status'
          );
          reject();
        }
      );
    });
  }

  signOut() {
    this.isAuth = false;
    this.webService.get('user/logout').subscribe(
      (resp) => {
        alert(resp);
      },
      (errorResp) => {
        console.error('Already logged out !');
      }
    );
  }
}
