import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Store } from '@ngrx/store';

import { EventsService } from './events.service';

xdescribe('EventsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                EventsService,
                Store,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    it('should be defined', inject([EventsService, Store], (evtSrvc: EventsService, str) => {
        expect(evtSrvc).toBeDefined();
    }));
});
