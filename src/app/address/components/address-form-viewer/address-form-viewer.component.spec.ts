import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormViewerComponent } from './address-form-viewer.component';

describe('AddressFormViewerComponent', () => {
  let component: AddressFormViewerComponent;
  let fixture: ComponentFixture<AddressFormViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFormViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
