import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionLimit',
  pure: false,
})
export class DescriptionLimitPipe implements PipeTransform {

  transform(value: any, limit: number = 100, suffix: string = '...') {
    return value.length > limit ? `${value.substr(0, limit)}${suffix}` : value;
  }

}
