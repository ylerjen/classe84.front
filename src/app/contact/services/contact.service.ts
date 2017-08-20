import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../../environments/environment';
import { Contact } from '../models/Contact';

const BASE_URL = `${env.API_URL}/contact`;

@Injectable()
export class ContactService {

    constructor(private _http: Http) { }

    sendMail(contact: Contact): Observable<Response> {
        return this._http.post(BASE_URL, contact);
    }
}
