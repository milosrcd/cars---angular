import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarTableComponent } from './components/car-table/car-table.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: CarTableComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
