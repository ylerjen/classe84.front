import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../../shared/shared.module';
import { EventlistPageComponent } from './eventlist-page.component';

xdescribe('EventlistPageComponent', () => {
    let component: EventlistPageComponent;
    let fixture: ComponentFixture<EventlistPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [EventlistPageComponent]
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
