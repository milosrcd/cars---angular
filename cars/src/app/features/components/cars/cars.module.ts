import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { HeadlineComponent } from 'src/app/shared/components/headline/headline.component';
import { DescriptionLimitPipe } from 'src/app/shared/pipes/description-limit.pipe';
import { FullModelNamePipe } from 'src/app/shared/pipes/full-model-name.pipe';
import { AdminModule } from '../../admin/admin.module';
import { CarBackgroundDirective } from '../../directives/car-background.directive';
import { CarOverviewComponent } from '../car-overview/car-overview.component';
import { CarComponent } from '../car/car.component';
import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';

@NgModule({
  declarations: [
    CarOverviewComponent,
    CarComponent,
    CarsComponent,
    DescriptionLimitPipe,
    FullModelNamePipe,
    HeadlineComponent,
    CarBackgroundDirective,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    NgxPaginationModule,
    AdminModule
  ],
  exports: [],
})
export class CarsModule { }
