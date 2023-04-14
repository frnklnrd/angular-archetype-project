import {AbstractControl, ValidationErrors} from '@angular/forms';

export function BooksAddEditTitleCustomValidator(control: AbstractControl): ValidationErrors | null {

  const hasError = control.value ? (control.value as string).startsWith('abc') : false;

  return hasError ? {
    errorTitleStartsWithAbc: {
      customError: true,
      customMessage: 'app.errors.titleStartsWithAbc'
    }
  } : null;
}

