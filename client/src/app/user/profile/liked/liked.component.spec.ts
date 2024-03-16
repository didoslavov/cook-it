import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedComponent } from './liked.component';

describe('LikedComponent', () => {
  let component: LikedComponent;
  let fixture: ComponentFixture<LikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
