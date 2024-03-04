import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../../shared/carousel/carousel.component';
import { RecipeService } from '../../../services/recipe.service';
import { NewsData } from '../../../recipes/recipe.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import {
  IconDefinition,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

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

  declare faCalendar;

  constructor(private newsService: RecipeService) {
    this.faCalendar = faCalendarAlt;
  }

  ngOnInit() {
    this.loadNews();
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
    this.page++;
    this.newsService
      .getLatestNews(this.page, this.pageSize)
      .subscribe((news) => {
        const nextBatch = news.articles;
        this.visibleNews = this.visibleNews.concat(nextBatch);
      });
  }

  onScroll() {
    this.loadMoreNews();
  }
}
