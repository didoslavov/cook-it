import { Component } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';

@Component({
  selector: 'app-profile-recipes',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './profile-recipes.component.html',
  styleUrl: './profile-recipes.component.scss',
})
export class ProfileRecipesComponent {}
