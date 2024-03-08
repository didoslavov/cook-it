import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() count = 0;
  @Input() ingredients: string[] = [];
  @Input() currentOffset = 0;
  @Input() currentPage = 0;
  @Input() limit = 4;
  @Input() pagination: number[] = [];

  declare faArrowLeft;
  declare faArrowRight;

  constructor() {
    this.faArrowLeft = faAngleLeft;
    this.faArrowRight = faAngleRight;
  }
}
