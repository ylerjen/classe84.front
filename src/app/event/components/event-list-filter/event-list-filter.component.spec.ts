import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListFilterComponent } from './event-list-filter.component';

describe('EventListFilterComponent', () => {
  let component: EventListFilterComponent;
  let fixture: ComponentFixture<EventListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
