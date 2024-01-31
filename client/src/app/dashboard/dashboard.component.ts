import { Component } from '@angular/core';
import { CarouselComponent } from '../shared/carousel/carousel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
