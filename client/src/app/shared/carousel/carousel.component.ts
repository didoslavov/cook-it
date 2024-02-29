import { Component, OnInit, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { RecipeData } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../recipes/recipe-card/recipe-card.component';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { User } from '../../store/auth/user.model';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { HttpParams } from '@angular/common/http';

type RecipeServiceMethod = 'getRecipes' | 'getUserRecipes';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RecipeCardComponent, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  @Input() carouselType: 'all' | 'user' = 'all';
  @Input() title: string = '';

  recipes: RecipeData[] = [];
  faArrowUp = faAngleUp;
  faArrowDown = faAngleDown;

  declare user: User | null;

  currentOffset = 0;
  limit = 4;

  private currentUrlTree: UrlTree;
  private fetchMethod: RecipeServiceMethod = 'getRecipes';

  private createUrlTree(): void {
    let urlSegment = '/recipes';
    if (this.carouselType === 'user') {
      urlSegment = '/user/recipes';
    }
    this.currentUrlTree = this.router.createUrlTree([urlSegment], {
      queryParams: { offset: this.currentOffset, limit: this.limit },
    });
  }

  constructor(
    private recipeService: RecipeService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUrlTree = this.router.createUrlTree(['/recipes']);
  }

  ngOnInit(): void {
    this.fetchMethod =
      this.carouselType === 'user' ? 'getUserRecipes' : 'getRecipes';

    this.route.queryParamMap.subscribe((params) => {
      this.currentOffset = Number(params.get('offset'));
    });

    this.createUrlTree();

    this.router.navigateByUrl(this.currentUrlTree);
    this.fetchRecipes(this.fetchMethod, this.currentOffset);

    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user?.user;
    });
  }

  private fetchRecipes(
    method: RecipeServiceMethod,
    offset: number,
    limit: number = this.limit
  ): void {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

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

    this.createUrlTree();
    this.router.navigateByUrl(this.currentUrlTree);

    this.fetchRecipes(this.fetchMethod, this.currentOffset);
  }

  showPreviousRecipes(): void {
    this.currentOffset -= this.limit;

    if (this.currentOffset < 0) {
      this.currentOffset = 0;
      return;
    }

    this.createUrlTree();
    this.router.navigateByUrl(this.currentUrlTree);

    this.fetchRecipes(this.fetchMethod, this.currentOffset);
  }
}
