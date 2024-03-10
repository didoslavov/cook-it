import { Validators } from '@angular/forms';

export const ingredientValidators = {
  required: Validators.required,
  minLength: Validators.minLength(2),
  maxLength: Validators.maxLength(20),
};
