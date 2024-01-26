import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { HowComponent } from './how/how.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from '../core/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, HowComponent, AboutComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
