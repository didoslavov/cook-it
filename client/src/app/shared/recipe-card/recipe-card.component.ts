import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClock, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  faInfo = faInfo;
  faClock = faClock;
}
