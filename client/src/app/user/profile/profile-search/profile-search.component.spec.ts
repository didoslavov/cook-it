import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomeComponent } from './profile-search.component';

describe('ProfileHomeComponent', () => {
  let component: ProfileHomeComponent;
  let fixture: ComponentFixture<ProfileHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
