import { FormBuilder } from '@angular/forms'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedPage } from './unauthorized.page';
import { AuthService } from 'app/services/auth/auth.service';
import { LoginFormComponent } from 'app/auth/login-form/login-form.component';

xdescribe('UnauthorizedPage', () => {
  let component: UnauthorizedPage;
  let fixture: ComponentFixture<UnauthorizedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthorizedPage, LoginFormComponent ],
      providers: [ AuthService, FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthorizedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    console.log(component)
    expect(component).toBeTruthy();
  });
});
