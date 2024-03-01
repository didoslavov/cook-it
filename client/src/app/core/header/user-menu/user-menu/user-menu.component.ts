import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthApiActions } from '../../../../store/auth/auth.actions';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../../../store/auth/auth.selectors';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef;

  declare userId: string | null;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.pipe(select(getUserData)).subscribe((user: any) => {
      this.userId = user?.user.id;
    });
  }

  faUser = faUser;
  faLogout = faRightFromBracket;

  logout() {
    this.store.dispatch(AuthApiActions.logout());

    this.router.navigate(['/']);
  }
}
