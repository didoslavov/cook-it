import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnInit {
  errors: string[] = [];
  declare faExclamation;

  constructor(private errorService: ErrorService) {
    this.faExclamation = faExclamationCircle;
  }

  ngOnInit() {
    this.errorService.errors$.subscribe((errors) => (this.errors = errors));
  }
}
