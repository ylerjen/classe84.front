import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';
import { MAILER_TOKEN } from '../../config/settings';
import { Contact } from '../models/Contact';

const BASE_URL = `${env.API_URL}/contact`;

@Injectable()
export class ContactService {

    constructor(private _http: Http) { }

    sendContactMail(contact: Contact): Observable<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-mail-token', MAILER_TOKEN);
        
        let opts = new RequestOptions({ headers });
        return this._http.post(BASE_URL, contact, opts);
    }
}
