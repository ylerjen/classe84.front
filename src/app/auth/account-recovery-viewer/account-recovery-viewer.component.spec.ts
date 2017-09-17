import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoveryViewerComponent } from './account-recovery-viewer.component';

describe('AccountRecoveryViewerComponent', () => {
  let component: AccountRecoveryViewerComponent;
  let fixture: ComponentFixture<AccountRecoveryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRecoveryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRecoveryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
