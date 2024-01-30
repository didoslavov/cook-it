import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  @ViewChild('menu') menu!: ElementRef;

  faUser = faUser;
  faLogout = faRightFromBracket;
}
