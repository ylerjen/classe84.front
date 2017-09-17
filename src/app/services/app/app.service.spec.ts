import { async,
    getTestBed,
    TestBed,
    inject } from '@angular/core/testing';
import {
        MockBackend,
        MockConnection
    } from '@angular/http/testing';
import { BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend } from '@angular/http';

import { Version } from '../../models/Version';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                AppService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });
        TestBed.compileComponents();
    }));

    const testbed = getTestBed();
    const backend = testbed.get(MockBackend);
    service = testbed.get(AppService);

    function setupConnections(backend: MockBackend, options: any) {
        backend.connections.subscribe((connection: MockConnection) => {
            if (connection.request.url === 'api/forms') {
                const responseOptions = new ResponseOptions(options);
                const response = new Response(responseOptions);

                connection.mockRespond(response);
            }
        });
    }


    it('should be defined', () => {
        expect(AppService).toBeDefined();
    });

    it('should return the api version from the server on success', () => {
        setupConnections(backend, {
            body: { full: '1.0.0', major: 1, minor: 0, patch: 0 },
            status: 200
        });

        service.getApiVersion().subscribe((data: Version) => {
            expect(data.major).toBe(1);
        });
    });
});
