import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListWrapperComponent } from './user-list-wrapper.component';

xdescribe('UserListWrapperComponent', () => {
  let component: UserListWrapperComponent;
  let fixture: ComponentFixture<UserListWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
