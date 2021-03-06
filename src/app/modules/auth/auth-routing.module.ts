import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from '@modules/auth/pages/register/register.page';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
