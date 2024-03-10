import { Validators } from '@angular/forms';
import { matchPassword } from './custom.validators';

export const rePasswordValidators = {
  required: Validators.required,
  minLength: Validators.minLength(6),
  matchPassword,
};
