import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBowlRice,
  faCompass,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-how',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './how.component.html',
  styleUrl: './how.component.scss',
})
export class HowComponent {
  faPeopleGroupIcon = faPeopleGroup;
  faCompass = faCompass;
  faBowl = faBowlRice;
}
