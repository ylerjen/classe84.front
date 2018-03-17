import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment as env } from '../../../environments/environment';
import { Version } from 'app/models/Version';

@Injectable()
export class AppService {

    constructor(
        private _http: Http
    ) { }

    getApiVersion(): Observable<Version> {
        const endPoint = `${env.API_URL}/version`;
        return this._http.get(endPoint)
            .map(res => Version.fromObj(res.json()));
    }
}
