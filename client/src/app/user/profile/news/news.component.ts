import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { RecipeService } from '../../../services/recipe.service';
import { NewsData } from '../../../recipes/recipe.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    InfiniteScrollModule,
    FontAwesomeModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  news: NewsData[] = [];
  visibleNews: NewsData[] = [];
  page = 1;
  pageSize = 20;
  initialScrollPosition = 0;
  previousScrollPosition = 0;

  private declare navigationEndSubscription: Subscription;
  declare faCalendar;

  constructor(
    private newsService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.faCalendar = faCalendarAlt;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.page = parseInt(params['page'] || '1', 10);
      this.loadNews();
    });

    this.navigationEndSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadNews();
      });

    if (!this.route.snapshot.queryParams['page']) {
      this.router.navigate([], { queryParams: { page: 1 } });
    }
  }

  loadNews() {
    this.newsService
      .getLatestNews(this.page, this.pageSize)
      .subscribe((news) => {
        this.news = news.articles;
        this.loadMoreNews();
      });
  }

  loadMoreNews() {
    if (this.page !== 1) {
      this.page++;
    }

    this.newsService
      .getLatestNews(this.page, this.pageSize)
      .subscribe((news) => {
        const nextBatch = news.articles;
        this.visibleNews = [...this.visibleNews, ...nextBatch];

        this.router.navigate([], { queryParams: { page: this.page } });
      });
  }

  onScroll() {
    this.loadMoreNews();
  }
}
