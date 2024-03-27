import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  directionsState,
  iconAnimation,
  ingredientsState,
} from '../../animations';
import { User } from '../../store/auth/user.model';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import {
  faBookmark as faBookmarkFull,
  faHeart as faHeartFull,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, LoaderComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  animations: [ingredientsState, directionsState, iconAnimation],
})
export class DetailsComponent implements OnInit {
  recipe: Recipe = {
    like: { liked: false, likesCount: 0 },
    bookmark: { bookmarked: false, bookmarksCount: 0 },
  };
  recipeId = '';
  showIngredients = true;
  showDirections = false;
  isLiked: boolean | undefined = false;
  isBookmarked: boolean | undefined = false;
  isLoading: boolean | undefined = false;

  declare user: User | null;
  declare faHeart;
  declare faHeartFull;
  declare faBookmark;
  declare faBookmarkFull;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private store: Store,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {
    this.faHeart = faHeart;
    this.faHeartFull = faHeartFull;
    this.faBookmark = faBookmark;
    this.faBookmarkFull = faBookmarkFull;
  }

  ngOnInit() {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user?.user;
    });

    this.loadingService
      .getLoadingState()
      .subscribe((loading) => (this.isLoading = loading));

    this.route.params.subscribe((params) => {
      this.recipeId = params['recipeId'];

      if (this.recipeId) {
        this.recipeService.getRecipeById(this.recipeId).subscribe((recipe) => {
          this.isLiked = recipe.likes?.some(
            (like) => like.userId === this.user?.id
          );
          this.isBookmarked = recipe.bookmarks?.some(
            (like) => like.userId === this.user?.id
          );
          this.recipe = recipe;
        });
      }
    });
  }

  onToggleIngredients() {
    if (this.showDirections) {
      this.showIngredients = !this.showIngredients;
      this.showDirections = !this.showDirections;
    }
  }

  onToggleDirections() {
    if (this.showIngredients) {
      this.showDirections = !this.showDirections;
      this.showIngredients = !this.showIngredients;
    }
  }

  onLike() {
    if (this.user && this.user.id !== this.recipe.userId) {
      if (this.isLiked) {
        this.recipeService.removeLike(this.recipeId).subscribe((like) => {
          this.isLiked = like.liked;
          this.recipe.like!.likesCount = like.likesCount;

          this.notificationService.setNotification({
            message: `You removed like for ${this.recipe.name}`,
            type: 'success',
          });
        });
      } else {
        this.recipeService.likeRecipe(this.recipeId).subscribe((like) => {
          this.isLiked = like.liked;
          this.recipe.like!.likesCount = like.likesCount;

          this.notificationService.setNotification({
            message: `You liked ${this.recipe.name}`,
            type: 'success',
          });
        });
      }
    }
  }

  onBookmark() {
    if (this.user && this.user.id !== this.recipe.userId) {
      if (this.isBookmarked) {
        this.recipeService
          .removeBookmark(this.recipeId)
          .subscribe((bookmark) => {
            this.isBookmarked = bookmark.bookmarked;
            this.recipe.bookmark!.bookmarksCount = bookmark.bookmarksCount;

            this.notificationService.setNotification({
              message: `You removed ${this.recipe.name} from bookmarks`,
              type: 'success',
            });
          });
      } else {
        this.recipeService
          .bookmarkRecipe(this.recipeId)
          .subscribe((bookmark) => {
            this.isBookmarked = bookmark.bookmarked;
            this.recipe.bookmark!.bookmarksCount = bookmark.bookmarksCount;

            this.notificationService.setNotification({
              message: `You bookmarked ${this.recipe.name}`,
              type: 'success',
            });
          });
      }
    }
  }
}
