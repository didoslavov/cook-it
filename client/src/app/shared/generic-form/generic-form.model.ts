import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface GenericFormData {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  password?: string;
  rePassword?: string;
  name?: string;
  prepTime?: string;
  cookTime?: string;
  img?: string;
  ingredients?: string;
  steps?: string;
  description?: string;
}

export class GenericFormModel {
  form: FormGroup;

  constructor(data: GenericFormData) {
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
      name: new FormControl(data.name),
      prepTime: new FormControl(data.prepTime),
      cookTime: new FormControl(data.cookTime),
      img: new FormControl(data.img),
      ingredients: new FormControl(data.ingredients),
      steps: new FormControl(data.steps),
      description: new FormControl(data.description),
    });
  }
}
