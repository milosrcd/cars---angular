import { Pipe, PipeTransform } from '@angular/core';
import { CarDetails } from 'src/app/features/models/car-details.interface';

@Pipe({
  name: 'fullModelName',
  pure: false
})
export class FullModelNamePipe implements PipeTransform {

  transform(car: CarDetails ): string {
    return `${car.name} ${car.model}`
  }


}
