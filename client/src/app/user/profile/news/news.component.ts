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
  mockedNews = [
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Jagmeet Singh',
      title:
        'Apple abandons its car: Here are other projects the company has killed',
      description:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company hiring prominent executives from places like Tesla and Ford…',
      url: 'https://techcrunch.com/2024/03/02/apple-abandons-its-car-here-are-other-projects-the-company-has-killed/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2018/09/dims1.jpg?resize=1200,800',
      publishedAt: '2024-03-02T15:30:59Z',
      content:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company… [+3243 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Jagmeet Singh',
      title:
        'Apple abandons its car: Here are other projects the company has killed',
      description:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company hiring prominent executives from places like Tesla and Ford…',
      url: 'https://techcrunch.com/2024/03/02/apple-abandons-its-car-here-are-other-projects-the-company-has-killed/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2018/09/dims1.jpg?resize=1200,800',
      publishedAt: '2024-03-02T15:30:59Z',
      content:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company… [+3243 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Jagmeet Singh',
      title:
        'Apple abandons its car: Here are other projects the company has killed',
      description:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company hiring prominent executives from places like Tesla and Ford…',
      url: 'https://techcrunch.com/2024/03/02/apple-abandons-its-car-here-are-other-projects-the-company-has-killed/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2018/09/dims1.jpg?resize=1200,800',
      publishedAt: '2024-03-02T15:30:59Z',
      content:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company… [+3243 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Jagmeet Singh',
      title:
        'Apple abandons its car: Here are other projects the company has killed',
      description:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company hiring prominent executives from places like Tesla and Ford…',
      url: 'https://techcrunch.com/2024/03/02/apple-abandons-its-car-here-are-other-projects-the-company-has-killed/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2018/09/dims1.jpg?resize=1200,800',
      publishedAt: '2024-03-02T15:30:59Z',
      content:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company… [+3243 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Jagmeet Singh',
      title:
        'Apple abandons its car: Here are other projects the company has killed',
      description:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company hiring prominent executives from places like Tesla and Ford…',
      url: 'https://techcrunch.com/2024/03/02/apple-abandons-its-car-here-are-other-projects-the-company-has-killed/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2018/09/dims1.jpg?resize=1200,800',
      publishedAt: '2024-03-02T15:30:59Z',
      content:
        'Apple has scrapped plans to enter the automotive industry with its mysterious autonomous electric car, instead shifting focus to the wildly popular world of generative AI. The project saw the company… [+3243 chars]',
    },
  ];

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
