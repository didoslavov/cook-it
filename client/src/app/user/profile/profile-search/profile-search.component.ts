import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../recipes/recipe.model';
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

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [ReactiveFormsModule, CarouselComponent, FontAwesomeModule],
  templateUrl: './profile-search.component.html',
  styleUrl: './profile-search.component.scss',
})
export class ProfileSearchComponent implements OnInit {
  searchForm: FormGroup;
  recipes: Recipe[] | null = [];
  ingredients: string[] = [];
  pagination: number = 0;

  declare faArrowUp;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.faArrowUp = faTurnUp;
    this.searchForm = this.formBuilder.group({
      searchQuery: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const ingredientsParam = params['ingredients'];
      if (ingredientsParam) {
        this.ingredients = ingredientsParam.split(',');
      } else {
        this.ingredients = [];
      }
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const searchQuery = this.searchForm.value.searchQuery;
      this.ingredients = searchQuery
        .split(',')
        .map((ingredient: string) => ingredient.trim());
    }
  }
}
