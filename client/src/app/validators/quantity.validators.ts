import { Validators } from '@angular/forms';
import { quantityFormatValidator } from './custom.validators';

export const quantityValidators = {
  required: Validators.required,
  quantityFormatValidator,
};
