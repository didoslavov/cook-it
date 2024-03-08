import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Recipe, RecipeData } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../recipes/recipe-card/recipe-card.component';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { User } from '../../store/auth/user.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  switchMap,
  takeUntil,
} from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    RecipeCardComponent,
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    PaginationComponent,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() carouselType: 'all' | 'user' | 'search' = 'all';
  @Input() title: string = '';
  @Input() ingredients: string[] = [];

  declare user: User | null;

  recipes: Recipe[] = [];
  pagination: number[] = [];

  currentOffset = 0;
  currentPage = 0;
  recipesCount = 0;
  limit = 4;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredients'] && this.carouselType === 'search') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          offset: this.currentOffset,
          limit: this.limit,
          ingredients: this.ingredients.join(','),
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const offset = parseInt(params['offset'] || '0');
          this.currentPage =
            this.currentPage >= Math.ceil(this.pagination.length / this.limit)
              ? Math.ceil(offset / this.limit + 1)
              : this.currentPage;
          this.currentOffset = offset <= 0 ? 0 : offset - this.limit;

          return this.fetchRecipes(offset);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: (recipeData: RecipeData) => {
          this.recipes = recipeData.recipes;
          this.recipesCount = recipeData.count;
          this.pagination = new Array(Math.ceil(this.recipesCount / this.limit))
            .fill(0)
            .map((_, i) => i + 1);
        },
        error: () => {
          this.recipes = [];
          this.recipesCount = 0;
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
      .set('limit', '4'.toString());

    if (this.carouselType === 'search' && this.ingredients.length > 0) {
      queryParams = queryParams.set('ingredients', this.ingredients.join(','));
    }

    const method = this.getMethod();

    return this.recipeService[method](queryParams).pipe(
      catchError((error) => {
        console.error('Error fetching recipes:', error);
        this.recipes = [];
        this.recipesCount = 0;
        return EMPTY;
      })
    );
  }

  private getMethod():
    | 'getRecipes'
    | 'getUserRecipes'
    | 'searchRecipesByIngredients' {
    switch (this.carouselType) {
      case 'user':
        return 'getUserRecipes';
      case 'search':
        return 'searchRecipesByIngredients';
      default:
        return 'getRecipes';
    }
  }
}
