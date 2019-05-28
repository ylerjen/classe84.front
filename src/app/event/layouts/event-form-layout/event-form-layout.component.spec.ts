import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormLayoutComponent } from './event-form-layout.component';

describe('EventFormLayoutComponent', () => {
  let component: EventFormLayoutComponent;
  let fixture: ComponentFixture<EventFormLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventFormLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
