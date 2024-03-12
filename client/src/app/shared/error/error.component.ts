import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent implements OnInit {
  declare faExclamation;

  errors: { [inputName: string]: {} } = {};

  constructor(private errorService: ErrorService) {
    this.faExclamation = faExclamationCircle;
  }

  ngOnInit(): void {
    this.errorService.errors$.subscribe((errors) => {
      this.errors = errors;
    });
  }

  getFieldName(key: string): string {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
