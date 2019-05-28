import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailLayoutComponent } from './event-detail-layout.component';

describe('EventDetailLayoutComponent', () => {
  let component: EventDetailLayoutComponent;
  let fixture: ComponentFixture<EventDetailLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
