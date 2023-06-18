import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
  name: 'checkValidity',
  pure: false
})
export class CheckValidityPipe implements PipeTransform {

  transform(formControl: FormControl): boolean {
    return (formControl.dirty || formControl.touched) && formControl.invalid
  }

}
