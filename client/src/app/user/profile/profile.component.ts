import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { fadeInAnimation } from '../../animations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  animations: [fadeInAnimation],
})
export class ProfileComponent implements OnInit {
  userId = '';
  isRecipesRoute = false;
  offset = 0;
  limit = 4;
  isFirstLoad = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
      this.offset = params['offset'];
      this.limit = params['limit'];
    });

    this.setRecipesRoute();
  }

  private setRecipesRoute(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isRecipesRoute =
          this.route.snapshot.firstChild?.routeConfig?.path === 'recipes' ||
          false;

        if (this.isFirstLoad) {
          this.isFirstLoad = false;
        }
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      !this.isFirstLoad && outlet && outlet.isActivated && outlet.activatedRoute
    );
  }
}
