import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { RecipeData } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../recipes/recipe-card/recipe-card.component';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { User } from '../../store/auth/user.model';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type RecipeServiceMethod =
  | 'getRecipes'
  | 'getUserRecipes'
  | 'searchRecipesByIngredients';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RecipeCardComponent, FontAwesomeModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() carouselType: 'all' | 'user' | 'search' = 'all';
  @Input() title: string = '';
  @Input() ingredients: string[] = [];

  recipes: RecipeData[] = [];
  faArrowLeft = faAngleLeft;
  faArrowRight = faAngleRight;

  declare user: User | null;

  currentOffset = 0;
  limit = 4;

  private currentUrlTree: UrlTree;
  private fetchMethod: RecipeServiceMethod = 'getRecipes';

  constructor(
    private recipeService: RecipeService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrlTree = this.router.createUrlTree(['/recipes']);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredients']) {
      this.fetchRecipes(this.fetchMethod, 0, this.limit);
    }
  }

  ngOnInit(): void {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user?.user;
    });

    this.route.queryParamMap.subscribe((params) => {
      this.currentOffset = Number(params.get('offset')) || 0;
    });

    if (this.carouselType === 'user') {
      this.fetchMethod = 'getUserRecipes';
      const userId = this.user ? this.user.id : '';
      this.currentUrlTree = this.router.createUrlTree(
        [`/profile/${userId}/recipes`],
        {
          queryParams: {
            offset: this.currentOffset.toString(),
            limit: this.limit.toString(),
          },
        }
      );
    } else if (this.carouselType === 'search' && this.ingredients.length > 0) {
      this.fetchMethod = 'searchRecipesByIngredients';
      const ingredientsString = this.ingredients.join(',');
      this.currentUrlTree = this.router.createUrlTree(
        [`/profile/${this.user?.id}/search`],
        {
          queryParams: {
            ingredients: ingredientsString,
            offset: this.currentOffset.toString(),
            limit: this.limit.toString(),
          },
        }
      );
    } else {
      this.fetchMethod = 'getRecipes';
      this.currentUrlTree = this.router.createUrlTree(['/recipes'], {
        queryParams: {
          offset: this.currentOffset.toString(),
          limit: this.limit.toString(),
        },
      });
    }

    this.router.navigateByUrl(this.currentUrlTree);
    this.fetchRecipes(this.fetchMethod);
  }

  private fetchRecipes(
    method: RecipeServiceMethod,
    offset: number = this.currentOffset,
    limit: number = this.limit
  ): void {
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    if (this.carouselType === 'search' && this.ingredients.length > 0) {
      const ingredientsString = this.ingredients.join(',');
      params = params.set('ingredients', ingredientsString);
    }

    this.recipeService[method](params).subscribe({
      next: (recipes: RecipeData[]) => {
        this.recipes = recipes;
      },
      error: () => {
        this.recipes = [];
      },
    });
  }

  showNextRecipes(): void {
    if (!this.recipes.length) return;

    this.currentOffset += this.limit;

    this.navigateToRecipes();
  }

  showPreviousRecipes(): void {
    this.currentOffset -= this.limit;

    if (this.currentOffset < 0) {
      this.currentOffset = 0;
      return;
    }

    this.navigateToRecipes();
  }

  private navigateToRecipes(): void {
    let url = '';

    if (this.carouselType === 'search') {
      const ingredientsString = this.ingredients.join(',');
      url = `/profile/${this.user?.id}/search?ingredients=${ingredientsString}&offset=${this.currentOffset}&limit=${this.limit}`;
    } else if (this.carouselType === 'user') {
      url = `/profile/${this.user?.id}/recipes?offset=${this.currentOffset}&limit=${this.limit}`;
    } else {
      url = `/recipes?offset=${this.currentOffset}&limit=${this.limit}`;
    }

    this.router.navigateByUrl(url);
    this.fetchRecipes(this.fetchMethod, this.currentOffset);
  }
}
