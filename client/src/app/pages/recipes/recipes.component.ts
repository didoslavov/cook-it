import { Component } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {}
