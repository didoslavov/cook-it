import { Component, Input } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { RecipeData } from '../../recipes/recipe.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RecipeCardComponent, FontAwesomeModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() recipes: RecipeData[] = [];
  faArrowUp = faAngleUp;
  faArrowDown = faAngleDown;
}
