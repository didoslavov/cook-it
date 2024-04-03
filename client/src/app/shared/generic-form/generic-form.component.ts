import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GenericFormData, GenericFormModel } from './generic-form.model';
import { RouterLink } from '@angular/router';
import { faListOl, faPlus, faSpoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  Ingredient,
  IngredientWithId,
  Recipe,
} from '../../recipes/recipe.model';
import { ErrorComponent } from '../error/error.component';
import { ErrorService } from '../../services/error.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SupabaseService } from '../../services/supabase.service';
import { LoadingService } from '../../services/loading.service';

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
export class GenericFormComponent implements OnInit, OnChanges, OnDestroy {
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
  image: File | null = null;
  isLoading: boolean | null = null;

  private errorsSubscription: Subscription | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  declare faBtn;
  declare faSpoon;
  declare faList;

  constructor(
    private errorService: ErrorService,
    private supabaseService: SupabaseService,
    private loadingService: LoadingService
  ) {
    this.faBtn = faPlus;
    this.faSpoon = faSpoon;
    this.faList = faListOl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('recipe' in changes && this.isRecipeEditForm()) {
      this.populateFormWithRecipeData();
    }
  }

  ngOnInit(): void {
    this.formModel = new GenericFormModel(this.formData, this.formType);
    this.formModel.form.addControl('ingredients', new FormControl(null));

    this.subscribeToLoadingState();

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
      Object.keys(this.formData).forEach((i) =>
        this.errorService.clearErrors(i)
      );
      this.errorsSubscription.unsubscribe();
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.image = file;
    }
  }

  onSubmit(): void {
    if (this.formModel.form.value.some((v: string) => v.trim() === '')) return;

    const formData = this.trimFormData(this.formModel.form.value);

    if (formData)
      this.supabaseService.uploadImage(this.image!).subscribe((img) => {
        if (this.formModel.form.valid) {
          if (this.isRecipeEditForm()) {
            const updatedRecipe: Recipe = {
              name: formData.name,
              prepTime: formData.prepTime,
              cookTime: formData.cookTime,
              img,
              ingredients: this.ingredients,
              steps: this.steps,
              description: formData.description,
            };

            this.formSubmit.emit(updatedRecipe);
          } else {
            this.formSubmit.emit({ ...formData, img });
          }
        } else {
          Object.keys(this.formModel.form.controls).forEach((input) => {
            const control = this.formModel.form.get(input);

            if (control && control.errors) {
              const currentErrors = control.errors as {
                [errorKey: string]: any;
              };

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
      });
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
      ingredientControl.value.trim() &&
      quantityControl &&
      quantityControl.value.trim() &&
      unitControl &&
      unitControl.value.trim()
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

    if (stepsControl && stepsControl.value.trim()) {
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

  private subscribeToLoadingState(): void {
    this.loadingService
      .getLoadingState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading: boolean) => {
        this.isLoading = loading;
        if (loading) {
          this.formModel.form.disable();
        } else {
          this.formModel.form.enable();
        }
      });
  }

  private populateFormWithRecipeData() {
    this.formModel?.form.patchValue({
      name: this.recipe.name,
      prepTime: this.recipe.prepTime,
      cookTime: this.recipe.cookTime,
      description: this.recipe.description,
    });
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
