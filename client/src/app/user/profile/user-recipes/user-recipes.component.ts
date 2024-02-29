import { Component } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';

@Component({
  selector: 'app-user-recipes',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.scss',
})
export class UserRecipesComponent {}
