import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarOverviewComponent } from '../car-overview/car-overview.component';
import { CarsComponent } from './cars.component';
const routes: Routes = [
  {
    path: '',
    component: CarsComponent
  },
  {
    path: 'cars/:id',
    component: CarOverviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
