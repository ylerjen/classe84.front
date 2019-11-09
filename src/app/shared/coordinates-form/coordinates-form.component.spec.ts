import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesFormComponent } from './coordinates-form.component';

describe('CoordinatesFormComponent', () => {
  let component: CoordinatesFormComponent;
  let fixture: ComponentFixture<CoordinatesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
