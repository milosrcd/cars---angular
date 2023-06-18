import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CheckValidityPipe } from '../shared/pipes/check-validity.pipe';
import { HasErrorPipe } from '../shared/pipes/has-error.pipe';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PageCenterComponent } from './components/page-center/page-center.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    PageCenterComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    HasErrorPipe,
    CheckValidityPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    PageCenterComponent,
    SidebarComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
