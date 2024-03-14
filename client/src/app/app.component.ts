import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { fadeInAnimation } from './animations';
import { AuthPageActions } from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { User } from './store/auth/user.model';
import { RecipesComponent } from './recipes/recipes.component';
import { NotificationComponent } from './shared/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RecipesComponent,
    NotificationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeInAnimation],
})
export class AppComponent implements OnInit {
  declare user: User | null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthPageActions.loadStateFromLocalStorage());
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
