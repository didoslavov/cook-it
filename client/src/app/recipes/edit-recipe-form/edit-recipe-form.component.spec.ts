import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipeFormComponent } from './edit-recipe-form.component';

describe('EditRecipeFormComponent', () => {
  let component: EditRecipeFormComponent;
  let fixture: ComponentFixture<EditRecipeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecipeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRecipeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
