import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormViewerComponent } from './user-form-viewer.component';

describe('UserFormViewerComponent', () => {
  let component: UserFormViewerComponent;
  let fixture: ComponentFixture<UserFormViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
