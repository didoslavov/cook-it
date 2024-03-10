import { FormControl, Validators } from '@angular/forms';
import { ImageUrlValidator } from './imageUrl.validators';

export const avatarValidators = {
  required: Validators.required,
  isImage: (control: FormControl) => ImageUrlValidator.validate(control),
};
