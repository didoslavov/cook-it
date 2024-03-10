import { AbstractControl, Validators } from '@angular/forms';
import { imageUrlValidator } from './imageUrl.validators';

export const avatarValidators = {
  required: Validators.required,
  isImage: (control: AbstractControl) => imageUrlValidator(control),
};
