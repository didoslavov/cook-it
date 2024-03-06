import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Recipe, RecipeData } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../recipes/recipe-card/recipe-card.component';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { User } from '../../store/auth/user.model';
import { ActivatedRoute, Router, RouterModule, UrlTree } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';

type RecipeServiceMethod =
  | 'getRecipes'
  | 'getUserRecipes'
  | 'searchRecipesByIngredients';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RecipeCardComponent, FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  @Input() carouselType: 'all' | 'user' | 'search' = 'all';
  @Input() title: string = '';
  @Input() ingredients: string[] = [];

  declare user: User | null;
  declare faArrowLeft;
  declare faArrowRight;

  recipes: Recipe[] = [];
  pagination: number[] = [];

  currentOffset = 0;
  limit = 4;

  constructor(
    private recipeService: RecipeService,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.faArrowLeft = faAngleLeft;
    this.faArrowRight = faAngleRight;
  }

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const offset = parseInt(params['offset'] || '0');
          return this.fetchRecipes(offset);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (recipeData: RecipeData) => {
          this.recipes = recipeData.recipes;
          this.pagination = new Array(Math.ceil(recipeData.count / this.limit))
            .fill(0)
            .map((_, i) => i + 1);
        },
        error: () => {
          this.recipes = [];
        },
      });

    this.store
      .pipe(select(getUserData), takeUntil(this.unsubscribe$))
      .subscribe((user: any) => {
        this.user = user?.user;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private fetchRecipes(offset: number): Observable<RecipeData> {
    let queryParams = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', this.limit.toString());

    if (this.carouselType === 'search' && this.ingredients.length > 0) {
      queryParams = queryParams.set('ingredients', this.ingredients.join(','));
    }

    const method = this.getMethod();

    return this.recipeService[method](queryParams);
  }

  private getMethod():
    | 'getRecipes'
    | 'getUserRecipes'
    | 'searchRecipesByIngredients' {
    if (this.carouselType === 'user') {
      return 'getUserRecipes';
    } else if (this.carouselType === 'search' && this.ingredients.length > 0) {
      return 'searchRecipesByIngredients';
    } else {
      return 'getRecipes';
    }
  }
}
