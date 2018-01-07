import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormViewerComponent } from './event-form-viewer.component';

describe('EventFormViewerComponent', () => {
  let component: EventFormViewerComponent;
  let fixture: ComponentFixture<EventFormViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFormViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
