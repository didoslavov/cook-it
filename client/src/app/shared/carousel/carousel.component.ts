import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipeService } from '../../services/recipe.service';
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
import { LoadingService } from '../../services/loading.service';
import { LoaderComponent } from '../loader/loader.component';
import { RecipeCardComponent } from '../../recipes/recipe-card/recipe-card.component';
import { Recipe, RecipeData } from '../../recipes/recipe.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    RecipeCardComponent,
    FontAwesomeModule,
    CommonModule,
    RouterModule,
    PaginationComponent,
    LoaderComponent,
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() carouselType: 'all' | 'user' | 'search' | 'liked' | 'bookmarked' =
    'all';
  @Input() title: string = '';
  @Input() ingredients: string[] = [];

  declare user: User | null;

  recipes: Recipe[] = [];
  pagination: number[] = [];

  currentOffset = 0;
  currentPage = 0;
  recipesCount = 0;
  limit = 4;
  isLoading = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private loadingService: LoadingService,
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
    this.store
      .pipe(select(getUserData), takeUntil(this.unsubscribe$))
      .subscribe((user: any) => {
        this.user = user?.user;
      });

    this.loadingService
      .getLoadingState()
      .subscribe((isLoading) => (this.isLoading = isLoading));

    this.route.queryParams
      .pipe(
        switchMap((params) => {
          const offset = parseInt(params['offset'] || '0');

          this.currentPage = Math.floor(offset / this.limit) + 1;

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
      queryParams = queryParams.set('ingredients', this.ingredients.join(', '));
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
    | 'searchRecipesByIngredients'
    | 'getUserLikedRecipes'
    | 'getUserBookmarkedRecipes' {
    switch (this.carouselType) {
      case 'user':
        return 'getUserRecipes';
      case 'search':
        return 'searchRecipesByIngredients';
      case 'liked':
        return 'getUserLikedRecipes';
      case 'bookmarked':
        return 'getUserBookmarkedRecipes';
      default:
        return 'getRecipes';
    }
  }
}
