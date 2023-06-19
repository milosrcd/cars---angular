import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CarDetails } from '../models/car-details.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private httpClient: HttpClient) { }

  getAllCars(): Observable<CarDetails[]> {
    return this.httpClient.get<CarDetails[]>(`${environment.baseApiUrl}cars`).pipe(
      catchError((error: any) => {
        return throwError(
          () => new Error('Ooops! Something went wrong')
        )
      })
    )
  }

  searchCarsByEngine(engine: string): Observable<CarDetails[]> {
    return this.httpClient.get<CarDetails[]>(`${environment.baseApiUrl}cars?engine_like=${engine}`)
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error('Ooops! Something went wrong'));
        })
      );
  }

  getCarById(id: number): Observable<CarDetails> {
    return this.httpClient.get<CarDetails>(`${environment.baseApiUrl}cars/${id}`)
  }

  createCar(car: CarDetails) {
    return this.httpClient.post(`${environment.baseApiUrl}cars`, car);
  }

  updateCar(car: CarDetails): Observable<CarDetails> {
    return this.httpClient.put<CarDetails>(`${environment.baseApiUrl}cars/${car.id}`, car);
  }

  deleteCar(car: CarDetails) {
    return this.httpClient.delete<CarDetails>
      (`${environment.baseApiUrl}cars/${car.id}`);
  }
}
