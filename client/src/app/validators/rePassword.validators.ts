import { AbstractControl, FormControl, Validators } from '@angular/forms';

export const rePasswordValidators = {
  required: Validators.required,
  minLength: Validators.minLength(6),
  matchPassword: (control: AbstractControl) => matchPassword(control),
};

function matchPassword(control: AbstractControl) {
  const password = control.root.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { mismatch: true };
}
