import { Validators } from '@angular/forms';
import { imageUrlValidator } from './custom.validators';

export const avatarValidators = {
  required: Validators.required,
  isImage: imageUrlValidator,
};
