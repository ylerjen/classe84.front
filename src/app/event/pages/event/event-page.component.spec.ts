import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPageComponent } from './event-page.component';
import { EventDetailComponent } from '../../event-detail/event-detail.component';

xdescribe('EventPageComponent', () => {
    let component: EventPageComponent;
    let fixture: ComponentFixture<EventPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventPageComponent, EventDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
