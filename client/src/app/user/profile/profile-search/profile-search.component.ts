import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTurnUp } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../../recipes/recipe.model';
import { ErrorService } from '../../../services/error.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ErrorComponent } from '../../../shared/error/error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CarouselComponent,
    FontAwesomeModule,
    ErrorComponent,
    CommonModule,
  ],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
})
export class ProfileSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  recipes: Recipe[] | null = [];
  ingredients: string[] = [];
  pagination = 0;
  hasErrors = false;

  private errorsSubscription: Subscription | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  declare faArrowUp;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.faArrowUp = faTurnUp;
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const ingredientsParam = params['ingredients'];
      if (ingredientsParam) {
        try {
          this.searchForm.get('searchQuery')?.setValue(ingredientsParam);
          this.ingredients = ingredientsParam.split(', ');
        } catch (e) {}
      } else {
        this.ingredients = [];
      }
    });

    this.errorsSubscription = this.errorService.errors$
      .pipe(takeUntil(this.destroy$))
      .subscribe((errors) => {
        this.hasErrors = Object.keys(errors).some(
          (inputName) => Object.keys(errors[inputName]).length > 0
        );
      });
  }

  ngOnDestroy(): void {
    if (this.errorsSubscription) {
      Object.keys(this.searchForm.controls).forEach((i) =>
        this.errorService.clearErrors(i)
      );
      this.errorsSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.hasErrors = false;
      const searchQuery = this.searchForm.value.searchQuery;

      this.ingredients = searchQuery
        .split(', ')
        .map((ingredient: string) => ingredient.trim());
    } else {
      Object.keys(this.searchForm.controls).forEach((input) => {
        const control = this.searchForm.get(input);

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
}
