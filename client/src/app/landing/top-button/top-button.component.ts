import { Component, HostListener, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUpLong } from '@fortawesome/free-solid-svg-icons';
import { SmoothScrollDirective } from '../../directives/smooth-scroll.directive';

@Component({
  selector: 'app-top-button',
  standalone: true,
  imports: [FontAwesomeModule, SmoothScrollDirective],
  templateUrl: './top-button.component.html',
  styleUrl: './top-button.component.scss',
})
export class TopButtonComponent implements OnInit {
  arrowUp: IconDefinition = faUpLong;
  activateScrollTop!: boolean;

  ngOnInit(): void {
    this.activateScrollTop = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.activateScrollTop = window.scrollY > 100;
  }
}
