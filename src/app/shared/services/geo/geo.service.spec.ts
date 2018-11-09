import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { GeoService, IReverseGeoCodeResponse } from './geo.service';

describe('GeoService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                GeoService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    it('should be defined', inject([GeoService], geoSrvc => {
        expect(geoSrvc).toBeDefined();
    }));

    describe('#reverseGeocode()', () => {

        it('should return an Observable<IReverseGeoCodeResponse>',
            inject([GeoService, XHRBackend], (geoSrvc: GeoService, mockBackend) => {

            const mockResponse: IReverseGeoCodeResponse = {
              results: [],
              status: 'cool'
            };

            mockBackend.connections.subscribe((connection) => {
              connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })));
            });

            geoSrvc.reverseGeocode('fake address 42, 1337 Futurama').subscribe((resp: IReverseGeoCodeResponse) => {
              expect(resp.status).toBe('cool');
              expect(resp.results.length).toBe(0);
            });
        }));
    });
});
