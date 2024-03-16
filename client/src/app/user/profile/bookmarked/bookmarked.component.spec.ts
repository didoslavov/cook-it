import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedComponent } from './bookmarked.component';

describe('BookmarkedComponent', () => {
  let component: BookmarkedComponent;
  let fixture: ComponentFixture<BookmarkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookmarkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
