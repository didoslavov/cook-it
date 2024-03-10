import { Validators } from '@angular/forms';
import { isNumber } from './custom.validators';

export const cookTimeValidators = {
  required: Validators.required,
  isNumber,
};
