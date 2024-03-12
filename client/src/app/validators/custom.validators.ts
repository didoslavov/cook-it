import { AbstractControl } from '@angular/forms';

export function matchPassword(control: AbstractControl) {
  const password = control.root.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { mismatch: true };
}

export function isNumber(control: AbstractControl) {
  const value = control.value;

  return isNaN(value) ? { isNotNumber: true } : null;
}

export function quantityFormatValidator(control: AbstractControl) {
  const value = control.value;
  const pattern =
    /^(?:(?:\d+(?:\.\d+)?|\d+\/\d+)(?:\s*\/\s*\d+(?:\.\d+)?|\s*\/\s*\d+)?|\d+(?:\.\d+)?)$/;

  return !pattern.test(value) ? { invalidQuantity: true } : null;
}
