import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListWrapperComponent } from './event-list-wrapper.component';

xdescribe('EventListWrapperComponent', () => {
  let component: EventListWrapperComponent;
  let fixture: ComponentFixture<EventListWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
