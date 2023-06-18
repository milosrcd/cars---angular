import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, take, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CarDetails } from 'src/app/features/models/car-details.interface';
import { CarsService } from 'src/app/features/services/cars.service';
import { CreateCarComponent } from '../create-car/create-car.component';
import { NotificationService } from 'src/app/features/services/notification.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cars-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent implements OnInit {
  p: number = 1;
  notification?: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['rowIndex', 'name', 'price', 'youtubeLink', 'dateCreated', 'edit', 'delete'];
  columns = [
    {
      name: 'rowIndex',
      title: 'RowIndex',
      property: 'rowIndex'
    },
    {
      name: 'name',
      title: 'Name',
      property: 'name'
    },
    {
      name: 'price',
      title: 'Price',
      property: 'price'
    },
    {
      name: 'youtubeLink',
      title: 'Youtube Link',
      property: 'youtubeLink'
    },
    {
      name: 'dateCreated',
      title: 'Date Created',
      property: 'dateCreated'
    },
    {
      name: 'edit',
      title: 'Edit',
      property: 'edit'
    },
    {
      name: 'delete',
      title: 'Delete',
      property: 'delete'
    }
  ]
  cars: CarDetails[] = [];

  private notificationSubscription: Subscription;
  private unsubscribe$: Subject<void> = new Subject<void>;

  constructor(
    private carService: CarsService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private _snackBar: MatSnackBar
  ) {
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
    this.getCars();
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openCarDialog(editMode: boolean, car?: CarDetails) {
    this.dialog.open(CreateCarComponent, {
      minHeight: '400px',
      width: '22%',
      data: car
    })
  }

  deleteCar(car: CarDetails): void {
    this.carService.deleteCar(car)
      .pipe(take(1),
        tap(() => {
          this.cars = this.cars.filter(c => c.id !== car.id);
          this.notificationService.displayNotification('Car deleted');
        })
      )
      .subscribe({
        error: error => {
          console.log('Error deleting car:', error);
        }
      });
  }

  openVideo(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  private getCars() {
    this.carService.getAllCars()
      .pipe(takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.cars = data;
      })
  }
}
