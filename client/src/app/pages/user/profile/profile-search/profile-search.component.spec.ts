import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchComponent } from './profile-search.component';

describe('ProfileHomeComponent', () => {
  let component: ProfileSearchComponent;
  let fixture: ComponentFixture<ProfileSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
