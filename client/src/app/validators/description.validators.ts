import { Validators } from '@angular/forms';

export const descriptionValidators = {
  required: Validators.required,
  minLength: Validators.minLength(10),
};
