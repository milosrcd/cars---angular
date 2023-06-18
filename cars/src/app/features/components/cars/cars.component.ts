import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { CarDetails } from '../../models/car-details.interface';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {
  p: number = 1;
  pageSize = window.innerWidth < 1600 ? 6 : 8;
  cars: CarDetails[] = [];
  term: string = '';
  searchTerms$: Subject<string> = new Subject<string>();

  private unsubscribe$: Subject<void> = new Subject<void>;

  constructor(private carService: CarsService) { }

  ngOnInit(): void {
    console.log(window.innerWidth);
    this.searchTerms$
      .pipe(debounceTime(2500),
        takeUntil(this.unsubscribe$))
      .subscribe(term => {
        this.searchCars(term);
      });
    this.getCars();
  }


  private getCars() {
    this.carService.getAllCars()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.cars = data;
      })

  }

  private searchCars(term: string) {
    this.carService.searchCarsByEngine(term)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.cars = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
