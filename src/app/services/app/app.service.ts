import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';

@Injectable()
export class AppService {

    constructor(
        private _http: Http
    ) { }

    getApiVersion(): Observable<string> {
        const endPoint = `${env.API_URL}/version`;
        return this._http.get(endPoint)
            .map(res => res.json());
    }

}
