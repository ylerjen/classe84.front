import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailViewerComponent } from './user-detail-viewer.component';

describe('UserDetailViewerComponent', () => {
  let component: UserDetailViewerComponent;
  let fixture: ComponentFixture<UserDetailViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
