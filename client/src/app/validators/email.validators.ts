import { Validators } from '@angular/forms';

export const emailValidators = {
  required: Validators.required,
  isEmail: Validators.email,
};
