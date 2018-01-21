import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSubscriptionsViewerComponent } from './event-subscriptions-viewer.component';

xdescribe('EventSubscriptionsViewerComponent', () => {
    let component: EventSubscriptionsViewerComponent;
    let fixture: ComponentFixture<EventSubscriptionsViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventSubscriptionsViewerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventSubscriptionsViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
