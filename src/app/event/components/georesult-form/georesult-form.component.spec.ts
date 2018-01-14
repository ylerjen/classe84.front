import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoresultFormComponent } from './georesult-form.component';

describe('GeoresultFormComponent', () => {
  let component: GeoresultFormComponent;
  let fixture: ComponentFixture<GeoresultFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoresultFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoresultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
