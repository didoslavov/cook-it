import { Validators } from '@angular/forms';

export const passwordValidators = {
  required: Validators.required,
  minLength: Validators.minLength(6),
};
