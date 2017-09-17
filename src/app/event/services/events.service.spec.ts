import { TestBed, inject } from '@angular/core/testing';

import { EventsService } from './events.service';

xdescribe('EventsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EventsService]
        });
    });

    it('should ...', inject([EventsService], (service: EventsService) => {
        expect(service).toBeTruthy();
    }));
});
