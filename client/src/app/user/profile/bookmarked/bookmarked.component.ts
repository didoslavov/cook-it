import { Component } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';

@Component({
  selector: 'app-bookmarked',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './bookmarked.component.html',
  styleUrl: './bookmarked.component.scss',
})
export class BookmarkedComponent {}
