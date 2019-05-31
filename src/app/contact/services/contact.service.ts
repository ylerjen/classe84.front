import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../../../environments/environment';
import { MAILER_TOKEN } from 'app/config/settings';
import { Contact } from 'app/models/Contact';

const BASE_URL = `${env.API_URL}/contact`;

@Injectable()
export class ContactService {

    constructor(private _http: HttpClient) { }

    sendContactMail(contact: Contact): Observable<Object> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('x-mail-token', MAILER_TOKEN);

        const opts = { headers };
        return this._http.post(BASE_URL, contact, opts);
    }
}
