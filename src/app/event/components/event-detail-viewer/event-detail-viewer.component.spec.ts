import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailViewerComponent } from './event-detail-viewer.component';

describe('EventDetailViewerComponent', () => {
  let component: EventDetailViewerComponent;
  let fixture: ComponentFixture<EventDetailViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
