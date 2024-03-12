import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GenericFormData, GenericFormModel } from './generic-form.model';
import { RouterLink } from '@angular/router';
import {
  IconDefinition,
  faExclamation,
  faListOl,
  faPlus,
  faSpoon,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  Ingredient,
  IngredientWithId,
  Recipe,
  RecipeData,
} from '../../recipes/recipe.model';
import { ErrorComponent } from '../error/error.component';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FontAwesomeModule,
    ErrorComponent,
  ],
  templateUrl: './generic-form.component.html',
  styleUrl: './generic-form.component.scss',
})
export class GenericFormComponent implements OnInit, OnChanges {
  @Input() formData!: GenericFormData;
  @Input() formType!:
    | 'registration'
    | 'login'
    | 'create recipe'
    | 'edit recipe';
  @Input() recipe: Recipe = {};
  @Input() ingredients: Ingredient[] = [];
  @Input() steps: string[] = [];
  @Input() units: string[] = [];

  @Output() formSubmit = new EventEmitter<GenericFormData>();
  @Output() addIngredient = new EventEmitter<Ingredient[]>();
  @Output() updateIngredients = new EventEmitter<Ingredient[]>();
  @Output() addStep = new EventEmitter<string>();
  @Output() updateSteps = new EventEmitter<string[]>();

  buttonText!: string;
  headingText!: string;
  formModel!: GenericFormModel;
  ingredientToEdit!: IngredientWithId | undefined;
  hasErrors: boolean = false;
  private errorsSubscription: Subscription | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  declare faBtn;
  declare faSpoon;
  declare faList;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.faBtn = faPlus;
    this.faSpoon = faSpoon;
    this.faList = faListOl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('recipe' in changes && this.isRecipeEditForm()) {
      this.populateFormWithRecipeData();
    }
  }

  populateFormWithRecipeData(): void {
    this.formModel.form.patchValue({
      name: this.recipe.name,
      prepTime: this.recipe.prepTime,
      cookTime: this.recipe.cookTime,
      img: this.recipe.img,
      description: this.recipe.description,
    });
  }

  ngOnInit(): void {
    this.formModel = new GenericFormModel(this.formData, this.formType);
    this.formModel.form.addControl('ingredients', new FormControl(null));

    this.errorsSubscription = this.errorService.errors$
      .pipe(takeUntil(this.destroy$))
      .subscribe((errors) => {
        this.hasErrors = Object.keys(errors).some(
          (inputName) => Object.keys(errors[inputName]).length > 0
        );
      });

    this.headingText = this.isRegistrationForm()
      ? 'Sign Up for a Delicious Journey'
      : this.isLoginForm()
      ? "Let's Get Cooking"
      : this.isRecipeCreateForm()
      ? 'Design your recipe'
      : this.isRecipeEditForm()
      ? 'Redesign your recipe'
      : '';

    this.buttonText = this.isRegistrationForm()
      ? 'Sign Up'
      : this.isLoginForm()
      ? 'Sign In'
      : this.isRecipeCreateForm()
      ? 'Create'
      : this.isRecipeEditForm()
      ? 'Edit'
      : '';
  }

  ngOnDestroy(): void {
    if (this.errorsSubscription) {
      this.errorsSubscription.unsubscribe();
    }
  }

  isRegistrationForm(): boolean {
    return this.formType === 'registration';
  }

  isLoginForm(): boolean {
    return this.formType === 'login';
  }

  isRecipeEditForm(): boolean {
    return this.formType === 'edit recipe';
  }

  isRecipeCreateForm(): boolean {
    return this.formType === 'create recipe';
  }

  onAddIngredient(): void {
    const ingredientControl = this.formModel.form.get('ingredient');
    const quantityControl = this.formModel.form.get('quantity');
    const unitControl = this.formModel.form.get('unit');

    if (
      ingredientControl &&
      ingredientControl.value &&
      quantityControl &&
      quantityControl.value &&
      unitControl &&
      unitControl.value
    ) {
      const ingredient = {
        id: this.ingredientToEdit?.id,
        name: ingredientControl.value,
        ProductRecipe: {
          quantity: quantityControl.value,
          unit: unitControl.value,
        },
      };

      this.ingredients = this.ingredients.filter(
        (i) => i.name !== ingredient.name
      );

      this.addIngredient.emit([...this.ingredients, ingredient]);

      ingredientControl?.setValue('');
      quantityControl?.setValue('');
      unitControl?.setValue('');
    }
  }

  onEditIngredient(ingredient: Ingredient): void {
    const ingredientControl = this.formModel.form.get('ingredient');
    const quantityControl = this.formModel.form.get('quantity');
    const unitControl = this.formModel.form.get('unit');

    this.ingredientToEdit = this.ingredients.find((i) => {
      return i.name === ingredient.name;
    });

    this.ingredients = this.ingredients.filter(
      (i) => i.name !== ingredient.name
    );

    this.updateIngredients.emit([...this.ingredients]);

    ingredientControl?.setValue(ingredient.name);
    quantityControl?.setValue(ingredient.ProductRecipe.quantity);
    unitControl?.setValue(ingredient.ProductRecipe.unit);
  }

  onAddStep(): void {
    const stepsControl = this.formModel.form.get('steps');

    if (stepsControl && stepsControl.value) {
      this.addStep.emit(stepsControl.value);
      stepsControl.setValue('');
    }
  }

  onEditSteps(item: string): void {
    const stepsControl = this.formModel.form.get('steps');

    this.steps = this.steps.filter((i) => i !== item);
    this.updateSteps.emit([...this.steps]);

    stepsControl?.setValue(item);
  }

  onSubmit(): void {
    const formData = this.trimFormData(this.formModel.form.value);

    if (this.formModel.form.valid) {
      if (this.isRecipeEditForm()) {
        const updatedRecipe: Recipe = {
          name: formData.name,
          prepTime: formData.prepTime,
          cookTime: formData.cookTime,
          img: formData.img,
          ingredients: this.ingredients,
          steps: this.steps,
          description: formData.description,
        };

        this.formSubmit.emit(updatedRecipe);
      } else {
        this.formSubmit.emit(formData);
      }
    } else {
      Object.keys(this.formModel.form.controls).forEach((input) => {
        const control = this.formModel.form.get(input);

        if (control && control.errors) {
          const currentErrors = control.errors as { [errorKey: string]: any };

          for (const errorKey in currentErrors) {
            if (currentErrors.hasOwnProperty(errorKey)) {
              this.errorService.setErrors(input, {
                [errorKey]: currentErrors[errorKey],
              });
            }
          }
        } else {
          this.errorService.clearErrors(input);
        }
      });
    }
  }

  private trimFormData(formData: any): any {
    const trimmedData = { ...formData };

    for (const key in trimmedData) {
      if (typeof trimmedData[key] === 'string') {
        trimmedData[key] = trimmedData[key].trim();
      }
    }

    return trimmedData;
  }
}
