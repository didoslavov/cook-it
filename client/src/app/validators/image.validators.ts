import { Validators } from '@angular/forms';
import { imageUrlValidator } from './custom.validators';

export const imageValidators = {
  required: Validators.required,
  isImage: imageUrlValidator,
};
