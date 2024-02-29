import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  declare userId: string | null;
  isRecipesRoute: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isRecipesRoute =
          this.route.snapshot.firstChild?.routeConfig?.path === 'recipes';
      });
  }

  setRecipesLoaded(status: boolean): void {
    this.isRecipesRoute = status;
  }
}
