import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { slider } from './route-animations';
import { AuthPageActions } from './store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { User } from './store/auth/user.model';
import { RecipesComponent } from './recipes/recipes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    RecipesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slider],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}
  declare user: User | null;

  ngOnInit(): void {
    this.store.dispatch(AuthPageActions.loadStateFromLocalStorage());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData['animation'];
  }
}
