import { FormControl, FormGroup } from '@angular/forms';
import { firstNameValidators } from '../../validators/firstName.validators';
import { lastNameValidators } from '../../validators/lastName.validators';
import { emailValidators } from '../../validators/email.validators';

export interface GenericFormData {
  userId?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  password?: string;
  rePassword?: string;
  name?: string;
  prepTime?: number;
  cookTime?: number;
  img?: string;
  ingredient?: string[];
  quantity?: string;
  unit?: string;
  steps?: string[];
  description?: string;
}

export class GenericFormModel {
  form: FormGroup;

  constructor(data: GenericFormData) {
    this.form = new FormGroup({
      firstName: new FormControl(data.firstName, [
        firstNameValidators.required,
        firstNameValidators.minLength,
        firstNameValidators.maxLength,
        firstNameValidators.charSet,
      ]),
      lastName: new FormControl(data.lastName, [
        lastNameValidators.required,
        lastNameValidators.minLength,
        lastNameValidators.maxLength,
        lastNameValidators.charSet,
      ]),
      avatar: new FormControl(data.avatar),
      email: new FormControl(data.email, [
        emailValidators.required,
        emailValidators.isEmail,
      ]),
      password: new FormControl(data.password),
      rePassword: new FormControl(data.rePassword),
      name: new FormControl(data.name),
      prepTime: new FormControl(data.prepTime),
      cookTime: new FormControl(data.cookTime),
      img: new FormControl(data.img),
      ingredient: new FormControl(data.ingredient),
      quantity: new FormControl(data.quantity),
      unit: new FormControl(data.unit),
      steps: new FormControl(data.steps),
      description: new FormControl(data.description),
    });
  }
}
