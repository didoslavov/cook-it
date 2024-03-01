import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecipesComponent } from './profile-recipes.component';

describe('UserRecipesComponent', () => {
  let component: ProfileRecipesComponent;
  let fixture: ComponentFixture<ProfileRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
