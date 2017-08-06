import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlistPageComponent } from './eventlist-page.component';

describe('EventlistPageComponent', () => {
  let component: EventlistPageComponent;
  let fixture: ComponentFixture<EventlistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventlistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
