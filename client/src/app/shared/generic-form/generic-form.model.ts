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
import { descriptionValidators } from '../../validators/description.validators';

export interface GenericFormData {
  userId?: string;
  firstName?: string;
  lastName?: string;
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

  constructor(data: GenericFormData, formType: string) {
    this.form = new FormGroup({});

    switch (formType) {
      case 'registration':
        this.addRegistrationFormControls();
        break;
      case 'login':
        this.addLoginFormControls();
        break;
      case 'create recipe':
      case 'edit recipe':
        this.addRecipeFormControls();
        break;
      default:
        break;
    }

    if (data) {
      this.form.patchValue(data);
    }
  }

  private addRegistrationFormControls(): void {
    this.form.addControl(
      'firstName',
      new FormControl(null, [
        firstNameValidators.required,
        firstNameValidators.minLength,
        firstNameValidators.maxLength,
      ])
    );
    this.form.addControl(
      'lastName',
      new FormControl(null, [
        lastNameValidators.required,
        lastNameValidators.minLength,
        lastNameValidators.maxLength,
      ])
    );
    this.form.addControl('img', new FormControl(null));
    this.form.addControl(
      'email',
      new FormControl(null, [emailValidators.required, emailValidators.isEmail])
    );
    this.form.addControl(
      'password',
      new FormControl(null, [
        passwordValidators.required,
        passwordValidators.minLength,
      ])
    );
    this.form.addControl(
      'rePassword',
      new FormControl(null, [
        rePasswordValidators.required,
        rePasswordValidators.minLength,
        rePasswordValidators.matchPassword,
      ])
    );
  }

  private addLoginFormControls(): void {
    this.form.addControl(
      'email',
      new FormControl(null, [emailValidators.required, emailValidators.isEmail])
    );
    this.form.addControl(
      'password',
      new FormControl(null, [
        passwordValidators.required,
        passwordValidators.minLength,
      ])
    );
  }

  private addRecipeFormControls(): void {
    this.form.addControl(
      'name',
      new FormControl(null, [nameValidators.required])
    );
    this.form.addControl(
      'prepTime',
      new FormControl(null, [
        prepTimeValidators.required,
        prepTimeValidators.isNumber,
      ])
    );
    this.form.addControl(
      'cookTime',
      new FormControl(null, [
        cookTimeValidators.required,
        cookTimeValidators.isNumber,
      ])
    );
    this.form.addControl(
      'img',
      new FormControl(null, [imageValidators.required])
    );
    this.form.addControl('ingredient', new FormControl(null));
    this.form.addControl('quantity', new FormControl(null));
    this.form.addControl('unit', new FormControl(null));
    this.form.addControl('steps', new FormControl(null));
    this.form.addControl(
      'description',
      new FormControl(null, [
        descriptionValidators.required,
        descriptionValidators.minLength,
      ])
    );
  }
}
