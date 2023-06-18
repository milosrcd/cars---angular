import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'hasError',
  pure: false
})
export class HasErrorPipe implements PipeTransform {

  transform(formControl: FormControl, error: string): boolean {
    return formControl.dirty && formControl.errors?.[error]
  }
}
