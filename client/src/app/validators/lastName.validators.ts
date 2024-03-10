import { Validators } from '@angular/forms';

export const lastNameValidators = {
  required: Validators.required,
  minLength: Validators.minLength(4),
  maxLength: Validators.maxLength(50),
  charSet: Validators.pattern('[a-zA-Z ]*'),
};
