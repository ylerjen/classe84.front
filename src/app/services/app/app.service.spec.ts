import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Version } from '@models/Version';
import { AppService } from './app.service';

describe('AppService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                AppService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });


    it('should be defined', inject([AppService], appSrvc => {
        expect(appSrvc).toBeDefined();
    }));


    describe('#getApiVersion()', () => {

        it('should return the api version from the server on success', 
            inject([AppService, XHRBackend], (appSrvc: AppService, mockBackend) => {

            const mockResponse = {
                body: { full: '1.0.0', major: 1, minor: 2, patch: 3 },
                status: 200
            };

            appSrvc.getApiVersion().subscribe((data: Version) => {
                expect(data.major).toBe(1);
                expect(data.minor).toBe(2);
                expect(data.patch).toBe(3);
            });
        }));
    });
});
