import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../../recipes/recipe.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe: Recipe = {};

  faInfo = faInfo;
  faClock = faClock;
}
