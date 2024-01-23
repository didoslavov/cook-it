import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { HowComponent } from './how/how.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, HowComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
