import { CarsService } from './../../services/cars.service';
import { Component, OnInit } from '@angular/core';
import { CarDetails } from '../../models/car-details.interface';
import { Subject, take, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-overview',
  templateUrl: './car-overview.component.html',
  styleUrls: ['./car-overview.component.scss']
})
export class CarOverviewComponent implements OnInit {
  carId: string | null = '';
  carOverview?: CarDetails;

  cars: CarDetails[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>;

  constructor(private activatedRouter: ActivatedRoute, private carService: CarsService) { }

  ngOnInit(): void {
    this.getCarId();
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openVideo(videoUrl: string): void {
    window.open(videoUrl, '_blank');
  }

  private getCarById(id: string | null) {
    if (id) {
      this.carService.getCarById(+id)
        .pipe(
          take(1)
        )
        .subscribe(car => {
          this.carOverview = car;
        })
    }
  }

  private getCarId() {
    this.activatedRouter.paramMap
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(params => {
        const id = params.get('id');
        this.getCarById(id);
      });
  }
}
