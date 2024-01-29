import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthState, User, UserData } from '../../store/auth/user.model';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  declare attentionSeeker: string;
  declare user: User | null;

  faCircleXmark = faCircleXmark;
  faBars = faBars;
  showMobileNav = false;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user.user;
      console.log(user?.user.firstName);
    });

    this.activatedRoute.fragment.subscribe(
      (fragment: string | null) => fragment && this.scrollTo(fragment)
    );
  }

  scrollTo(section: string | null) {
    section &&
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

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
