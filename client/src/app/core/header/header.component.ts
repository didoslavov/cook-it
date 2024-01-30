import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../store/auth/user.model';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { UserMenuComponent } from './user-menu/user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild(UserMenuComponent) userMenuComponent!: UserMenuComponent;

  declare attentionSeeker: string;
  declare user: User | null;

  faCircleXmark = faCircleXmark;
  faBars = faBars;
  showMobileNav = false;
  showUserMenu = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.menuBtn.nativeElement &&
        e.target !== this.userMenuComponent.menu.nativeElement
      ) {
        this.showUserMenu = false;
      }
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.user = user.user;
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

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
  }
}
