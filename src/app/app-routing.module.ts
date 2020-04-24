import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheatsheetComponent } from './computing/cheatsheet/cheatsheet.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'computing',
    canActivate: [AuthGuard],
    component: CheatsheetComponent,
  },
  { path: '**', redirectTo: 'computing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
