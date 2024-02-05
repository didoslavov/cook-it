import { Component, Input, OnInit, HostListener } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { RecipeData } from '../../recipes/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RecipeCardComponent, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements OnInit {
  recipes: RecipeData[] = [];
  faArrowUp = faAngleUp;
  faArrowDown = faAngleDown;

  private currentOffset = 0;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.fetchRecipes(this.currentOffset);
  }

  private fetchRecipes(offset: number, limit: number = 4): void {
    this.recipeService.getRecipes(offset, limit).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }

  showNextRecipes(): void {
    if (this.recipes.length < 4) return;

    this.currentOffset += 4;

    this.fetchRecipes(this.currentOffset);
  }

  showPreviousRecipes(): void {
    this.currentOffset -= 4;

    if (this.currentOffset < 0) {
      this.currentOffset = 0;
      return;
    }

    this.fetchRecipes(this.currentOffset);
  }
}
