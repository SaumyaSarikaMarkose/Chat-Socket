import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { authGuard } from './auth/guards/auth.guard';
import { RegisterComponent } from './auth/login/register/register.component';
import { routeGuard } from './auth/guards/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',loadChildren: () => import('../app/modules/user/user.module').then(m => m.UserModule) },
  { path: 'admin',canActivate: [routeGuard], data: { expectedRole: 'admin' },
    loadChildren: () => import('../app/modules/admin/admin.module').then(m => m.AdminModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
