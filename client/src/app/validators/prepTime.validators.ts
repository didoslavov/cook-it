import { Validators } from '@angular/forms';
import { isNumber } from './custom.validators';

export const prepTimeValidators = {
  required: Validators.required,
  isNumber,
};
