import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MapquestResultPayload } from './Mapquest';

export const mapQuestKey = '2fUpwSXT0FPFJQSZG3quuUa282RBNhh7';
const mapQuestUrl = 'https://www.mapquestapi.com/geocoding/v1/address';

@Injectable()
export class GeoService {

    constructor(
        private _http: HttpClient,
    ) { }

    /**
     * Find a geolocation (lat/lon) from a given address with the mapquest geocoding service
     * @param location - the address of the location
     */
    reverseGeocodeMapQuest(location: string): Observable<MapquestResultPayload> {
        const url = new URL(mapQuestUrl);
        let params = new HttpParams();
        params = params.set('key', mapQuestKey);
        params = params.set('location', location);
        params = params.set('outFormat', 'json');
        return this._http.get<MapquestResultPayload>(url.toString(), { params });
    }
}
