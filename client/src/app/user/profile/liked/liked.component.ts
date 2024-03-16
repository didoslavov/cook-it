import { Component } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';

@Component({
  selector: 'app-liked',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './liked.component.html',
  styleUrl: './liked.component.scss',
})
export class LikedComponent {}
