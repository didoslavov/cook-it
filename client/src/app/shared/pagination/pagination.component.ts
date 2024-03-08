import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() count = 0;
  @Input() ingredients: string[] = [];

  currentOffset = 0;
  currentPage = 0;
  limit = 4;
  pagination: number[] = [];

  declare faArrowLeft;
  declare faArrowRight;

  constructor(private route: ActivatedRoute) {
    this.faArrowLeft = faAngleLeft;
    this.faArrowRight = faAngleRight;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const offset = parseInt(params.get('offset') || '0');

      this.currentPage =
        this.currentPage >= Math.ceil(this.pagination.length / this.limit)
          ? Math.ceil(offset / this.limit + 1)
          : this.currentPage;
      this.currentOffset = offset <= 0 ? 0 : offset - this.limit;

      this.pagination = new Array(Math.ceil(this.count / this.limit))
        .fill(0)
        .map((_, i) => i + 1);
    });
  }
}
