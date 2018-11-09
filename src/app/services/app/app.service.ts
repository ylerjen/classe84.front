import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment as env } from '../../../environments/environment';
import { Version } from 'app/models/Version';

@Injectable()
export class AppService {

    constructor(
        private _http: HttpClient
    ) { }

    getApiVersion(): Observable<Version> {
        const endPoint = `${env.API_URL}/version`;
        return this._http.get<Version>(endPoint)
            .map(res => Version.fromObj(res));
    }
}
