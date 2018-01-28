import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubscriptionsComponent } from './event-subscriptions.component';

xdescribe('EventSubscriptionsComponent', () => {
  let component: EventSubscriptionsComponent;
  let fixture: ComponentFixture<EventSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
