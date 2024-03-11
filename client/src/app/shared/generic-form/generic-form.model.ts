import { FormControl, FormGroup } from '@angular/forms';
import { firstNameValidators } from '../../validators/firstName.validators';
import { lastNameValidators } from '../../validators/lastName.validators';
import { emailValidators } from '../../validators/email.validators';
import { avatarValidators } from '../../validators/avatar.validators';
import { passwordValidators } from '../../validators/password.validators';
import { rePasswordValidators } from '../../validators/rePassword.validators';
import { nameValidators } from '../../validators/name.validators';
import { prepTimeValidators } from '../../validators/prepTime.validators';
import { cookTimeValidators } from '../../validators/cookTime.validators';
import { imageValidators } from '../../validators/image.validators';
import { ingredientValidators } from '../../validators/ingredient.validators';
import { quantityValidators } from '../../validators/quantity.validators';

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
      avatar: new FormControl(data.avatar, [
        avatarValidators.required,
        avatarValidators.isImage,
      ]),
      email: new FormControl(data.email, [
        emailValidators.required,
        emailValidators.isEmail,
      ]),
      password: new FormControl(data.password, [
        passwordValidators.required,
        passwordValidators.minLength,
      ]),
      rePassword: new FormControl(data.rePassword, [
        rePasswordValidators.required,
        rePasswordValidators.minLength,
        rePasswordValidators.matchPassword,
      ]),
      name: new FormControl(data.name, [nameValidators.required]),
      prepTime: new FormControl(data.prepTime, [
        prepTimeValidators.required,
        prepTimeValidators.isNumber,
      ]),
      cookTime: new FormControl(data.cookTime, [
        cookTimeValidators.required,
        cookTimeValidators.isNumber,
      ]),
      img: new FormControl(data.img, [
        imageValidators.required,
        imageValidators.isImage,
      ]),
      ingredient: new FormControl(data.ingredient, [
        ingredientValidators.required,
        ingredientValidators.minLength,
        ingredientValidators.maxLength,
      ]),
      quantity: new FormControl(data.quantity, [
        quantityValidators.required,
        quantityValidators.quantityFormatValidator,
      ]),
      unit: new FormControl(data.unit),
      steps: new FormControl(data.steps),
      description: new FormControl(data.description),
    });
  }
}
