import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, take, debounceTime } from 'rxjs';
import { CarDetails } from 'src/app/features/models/car-details.interface';
import { CarForm } from 'src/app/features/models/car-form.interface';
import { CarsService } from 'src/app/features/services/cars.service';
import { NotificationService } from 'src/app/features/services/notification.service';


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit, OnDestroy {
  selectedFile = null;
  notification?: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  private notificationSubscription: Subscription;

  private readonly youtubeValidator = [Validators.required, Validators.pattern(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)];

  carForm = this.fb.group({
    car: ['', Validators.required],
    model: ['', Validators.required],
    video: ['', this.youtubeValidator],
    description: ['', Validators.required],
    engine: ['', Validators.required],
    price: [0, Validators.required],
    uploadedImg: ['', Validators.required]
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CarDetails,
    private dialogReference: MatDialogRef<CreateCarComponent>,
    private carService: CarsService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {
    console.log('dialog', data);
    this.notificationSubscription = this.notificationService.notification$.subscribe(
      (message: string) => {
        this.notification = message;
        if (message) {
          this.openSnackBar(message);
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.data) {
      this.populateFormFields();
    }
  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
    this.carForm.patchValue({ uploadedImg: this.selectedFile });
  }

  populateFormFields(): void {
    const { name, model, videoUrl, description, engine, price, image } = this.data;
    this.carForm.patchValue({
      car: name,
      model,
      video: videoUrl,
      description,
      engine,
      price,
      uploadedImg: image
    });
  }


  onSubmit() {
    const formData = this.carForm.value as unknown as CarForm;
    const car: CarDetails = {
      name: formData.car,
      model: formData.model,
      videoUrl: formData.video,
      description: formData.description,
      engine: formData.engine,
      price: formData.price,
      image: '',
      createdAt: new Date().toISOString(),
      id: 0
    }

    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        car.image = fileReader.result as string;
        this.updateCar(car);
      };
      fileReader.readAsDataURL(this.selectedFile);
    } else {
      this.updateCar(car);
    }
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }

  private updateCar(car: CarDetails) {
    if (this.data) {
      car.id = this.data.id;
      this.carService.updateCar(car)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigateByUrl('admin');
          this.notificationService.displayNotification('Car edited successfully!')
          this.close();
        });
    } else {
      this.carService.createCar(car)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigateByUrl('admin');
          this.notificationService.displayNotification('Car created successfully!');
          this.close();
        });
    }
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  private close() {
    this.dialogReference.close('Dialog closed');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

}
