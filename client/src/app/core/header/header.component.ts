import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  declare attentionSeeker: string;
  faCircleXmark = faCircleXmark;
  faBars = faBars;
  showMobileNav = false;

  attentionSeekerAnimation($event: Event) {
    if ($event.type) {
      this.attentionSeeker =
        'animate__animated animate__pulse animate__infinite';
    }
  }

  attentionSeekerAnimationRemove($event: Event) {
    this.attentionSeeker = '';
  }

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  closeMobileNav() {
    this.showMobileNav = false;
  }
}
