import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../store/auth/user.model';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../store/auth/auth.selectors';
import { UserMenuComponent } from './user-menu/user-menu/user-menu.component';
import { NotificationService } from '../../services/notification.service';
import { AuthApiActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    UserMenuComponent,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild(UserMenuComponent) userMenuComponent!: UserMenuComponent;

  declare attentionSeeker: string;
  declare user: User | null;
  declare isHomePage: boolean;
  declare showRecipesLink: boolean;
  declare showCreateRecipeLink: boolean;

  faCircleXmark = faCircleXmark;
  faBars = faBars;
  showMobileNav = false;
  showUserMenu = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private renderer: Renderer2,
    private notificationService: NotificationService
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.menuBtn?.nativeElement &&
        e.target !== this.userMenuComponent?.menu.nativeElement
      ) {
        this.showUserMenu = false;
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.isHomePage =
          this.router.url === '/' || this.router.url.includes('#');

        this.showRecipesLink =
          this.router.url === '/' ||
          this.router.url === '/recipes' ||
          this.router.url.includes('/details') ||
          this.router.url.includes('/profile');

        this.showCreateRecipeLink = this.router.url === '/recipes/create';
      }
    });

    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      if (user?.user) {
        this.user = user.user;
      } else {
        this.user = user;
      }
    });

    this.activatedRoute.fragment.subscribe(
      (fragment: string | null) => fragment && this.scrollTo(fragment)
    );
  }

  scrollTo(section: string | null) {
    section &&
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });

    this.removeFragmentFromUrl();
  }

  removeFragmentFromUrl(): void {
    const currentUrl = this.router.url;
    const urlWithoutFragment = currentUrl.split('#')[0];
    this.router.navigateByUrl(urlWithoutFragment);
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

  logout() {
    this.notificationService.setNotification({
      message: 'Logged out successfully',
      type: 'success',
    });

    this.store.dispatch(AuthApiActions.logout());

    this.router.navigate(['/']);
  }
}
