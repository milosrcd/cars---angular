import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, take } from 'rxjs';
import { RegisterForm, User } from '../../interfaces/register-form.interface';
import { AuthService } from '../../services/auth-service.service';
import { NotificationService } from 'src/app/features/services/notification.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  notification?: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  private notificationSubscription: Subscription;

  private readonly nameValidators = [Validators.required, Validators.pattern(/^[A-Za-z]+ [A-Za-z]+$/)];
  private readonly passwordValidators = [Validators.required, Validators.pattern(/^\S{8,}$/)];

  profileForm = this.fb.group({
    fullName: ['', this.nameValidators],
    email: ['', [Validators.required, Validators.email]],
    password: ['', this.passwordValidators],
    confirmPassword: ['', this.passwordValidators],
  }, { validators: [this.confirmPasswordValidator] })



  private unsubscribe$: Subject<void> = new Subject<void>;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {
    this.notificationSubscription = this.notificationService.notification$.subscribe(
      (message: string) => {
        this.notification = message;
        if (message) {
          this.openSnackBar(message, 2000);
        }
      }
    );
  }

  onSubmit() {
    const formData = this.profileForm.value as RegisterForm;
    console.log(this.profileForm);
    const user: User = {
      fullName: formData.fullName || '',
      email: formData.email || '',
      password: formData.password || '',
      role: 'user',
    };
    this.authService.register(user)
      .pipe(take(1))
      .subscribe(() => {
        this.notificationService.displayNotification('You are registered successfully!');
        this.router.navigateByUrl('/login');
      });
  }

  getErrorMessage() {
    if (this.profileForm.controls.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.profileForm.controls.email.hasError('email') ? 'Not a valid email' : '';
  }


  ngOnInit(): void {
  }


  private openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration
    });
  }

  private confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup;

    const passwordControl: FormControl = formGroup.get('password') as FormControl;
    const confirmPasswordControl: FormControl = formGroup.get('confirmPassword') as FormControl;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({
        notMatch: {
          message: 'Confirm password not matching with the password'
        }
      })
    } else {
      confirmPasswordControl.setErrors(null)
    }

    return null;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
