import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    this.authService
      .signIn(form.value['email'], form.value['password'])
      .then(() => {
        this.router.navigate(['computing']);
      })
      .catch((e) => {});
  }
  onLogout() {
    this.authService.signOut();
    console.log('Logout');
  }
}
