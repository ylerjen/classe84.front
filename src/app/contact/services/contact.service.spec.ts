import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ContactService } from './contact.service';

describe('ContactService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContactService
            ],
            imports: [
                HttpModule
            ]
        });
        TestBed.compileComponents();
    });

    it('should be defined', inject([ContactService], contactSrvc => {
        expect(contactSrvc).toBeDefined();
    }));
});
