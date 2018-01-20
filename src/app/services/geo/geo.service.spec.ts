import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { GeoService, IReverseGeoCodeResponse } from './geo.service';

describe('GeoService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: '', useValue: 'http://example.com' },
                GeoService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });
    describe('#reverseGeocode()', () => {

        it('should return an Observable<IReverseGeoCodeResponse>',
            inject([GeoService, XHRBackend], (geoService: GeoService, mockBackend) => {
    
            const mockResponse: IReverseGeoCodeResponse = {
              results: [],
              status: 'cool'
            };
    
            mockBackend.connections.subscribe((connection) => {
              connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
              })));
            });
    
            geoService.reverseGeocode('fake address 42, 1337 Futurama').subscribe((resp: IReverseGeoCodeResponse) => {
              expect(resp.status).toBe('cool');
              expect(resp.results.length).toBe(0);
            });
    
        }));
      });
    });