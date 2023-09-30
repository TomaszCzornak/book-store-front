import {AbstractControl} from "@angular/forms";


export function capitalLetterValidator(control: AbstractControl) {
  if (control.value && control.value[0] !== control.value[0].toUpperCase()) {
    return {capitalLetter: true};
  }
  return null;
}
