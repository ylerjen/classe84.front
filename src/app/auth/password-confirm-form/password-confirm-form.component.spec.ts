import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordConfirmFormComponent } from './password-confirm-form.component';

describe('PasswordConfirmFormComponent', () => {
  let component: PasswordConfirmFormComponent;
  let fixture: ComponentFixture<PasswordConfirmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordConfirmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordConfirmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
