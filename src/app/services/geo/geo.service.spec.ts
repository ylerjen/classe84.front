/* tslint:disable:no-unused-variable */
import {
    JsonpModule,
    Jsonp,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    Http
} from "@angular/http";
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { MockBackend } from "@angular/http/testing";
import { GeoService, IReverseGeoCodeResponse } from './geo.service';

describe('GeoService', () => {

    let service: GeoService;
    let backend: MockBackend;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [JsonpModule],
            providers: [
                GeoService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Jsonp,
                    useFactory: (backend, options) => new Jsonp(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });

        // Get the MockBackend
        backend = TestBed.get(MockBackend);

        // Returns a service with the MockBackend so we can test with dummy responses
        service = TestBed.get(GeoService);

    });


    it('should be defined', inject([GeoService], geoSrvc => {
        expect(geoSrvc).toBeDefined();
    }));

    it('# the reverseGeocode method should return the mocked result', fakeAsync(() => {
        let mockedResponse: IReverseGeoCodeResponse = {
            results: [],
            status: 'ok'
        };

        // When the request subscribes for results on a connection, return a fake response
        backend.connections.subscribe(connection => {
            connection.mockRespond(new Response(<ResponseOptions>{
                body: JSON.stringify(mockedResponse)
            }));
        });

        let result: IReverseGeoCodeResponse;
        // Perform a request and make sure we get the response we expect
        service.reverseGeocode('fake address 13, 1234 Bumplitz')
            .subscribe( resp => result = resp);
        tick();
        expect(result.status).toBe('ok');
        expect(result.results).not.toBeNull();
    }));
});