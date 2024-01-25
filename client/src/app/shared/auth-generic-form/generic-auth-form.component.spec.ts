import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthGenericFormComponent } from './generic-auth-form.component';

describe('AuthGenericFormComponent', () => {
  let component: AuthGenericFormComponent;
  let fixture: ComponentFixture<AuthGenericFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthGenericFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthGenericFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
