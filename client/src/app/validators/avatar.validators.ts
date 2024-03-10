import { FormControl, Validators } from '@angular/forms';
import { ImageUrlValidator } from './image.validator';

export const avatarValidators = {
  required: Validators.required,
  isImage: (control: FormControl) => ImageUrlValidator.validate(control),
};
