import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Response, ResponseOptions, XHRBackend } from '@angular/http';

import { ContactService } from './contact.service';
import { Contact } from 'app/models/Contact';

describe('ContactService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContactService
            ],
            imports: [
                HttpClientModule
            ]
        });
        TestBed.compileComponents();
    });

    it('should be defined', inject([ContactService], contactSrvc => {
        expect(contactSrvc).toBeDefined();
    }));

    describe('#sendContactMail', () => {
        it('should return an Observable', inject([ContactService, XHRBackend], (contactSrvc: ContactService, mockBackend) => {
            const mockResponse = new Response(new ResponseOptions({
                status: 204
            }));

            const fakeContact: Contact = {
                name: 'John Doh',
                email: 'jd@example.org',
                message: 'message here...',
                captcha: ''
            };

            contactSrvc.sendContactMail(fakeContact)
                .subscribe( resp => {
                    expect(resp).toBe(mockResponse);
                });

        }));
    });
});
