import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRoutingModule } from './admin-routing.module';
import { CarTableComponent } from './components/car-table/car-table.component';
import { CreateCarComponent } from './components/create-car/create-car.component';

@NgModule({
  declarations: [
    CarTableComponent,
    CreateCarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatTooltipModule,
    MatIconModule,
    MatInputModule,
    NgxPaginationModule,
    MatButtonModule,
    MatSnackBarModule,
  ]
})
export class AdminModule { }
