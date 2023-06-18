import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { RegisterComponent } from './core/auth/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/components/cars/cars.module').then((module) => module.CarsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then((module) => module.AdminModule),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
