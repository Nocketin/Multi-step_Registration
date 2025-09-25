import { AbstractControl, ValidationErrors } from '@angular/forms';

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  
  const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s]{2,}$/;
  const isValid = nameRegex.test(control.value.trim());
  
  return isValid ? null : { invalidName: { value: control.value } };
}


