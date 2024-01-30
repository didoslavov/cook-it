import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface GenericAuthFormData {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email: string;
  password: string;
  rePassword?: string;
}

export class GenericAuthFormModel {
  form: FormGroup;

  constructor(data: GenericAuthFormData) {
    const passwordValidators = [Validators.required, Validators.minLength(6)];

    this.form = new FormGroup({
      firstName: new FormControl(data.firstName),
      lastName: new FormControl(data.lastName),
      avatar: new FormControl(data.avatar),
      email: new FormControl(data.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(data.password, passwordValidators),
      rePassword: new FormControl(data.rePassword),
    });
  }
}
