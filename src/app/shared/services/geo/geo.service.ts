import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GMAP_API_KEY } from 'app/config/settings';
import { Coordinates } from 'app/models/Coordinates';

const reverse_geocoding_url = 'https://maps.googleapis.com/maps/api/geocode/json';

@Injectable()
export class GeoService {

    constructor(
        private _http: HttpClient,
    ) { }

    /**
     * Find a geolocation (lat/lon) from a given address
     * @param location - the address of the location
     */
    reverseGeocode(location: string): Observable<IReverseGeoCodeResponse> {
        const params = new HttpParams();
        params.set('format', 'json');
        params.set('address', location);
        params.set('sensor', 'false');
        params.set('key', GMAP_API_KEY);

        return this._http.get<IReverseGeoCodeResponse>(reverse_geocoding_url, { params });
    };

}

export interface IReverseGeoCodeResponse {
    results: Array<IReverseGeoCodeResult>;
    status: string;
}

export interface IReverseGeoCodeResult {
    address_components: Array<Object>;
    formatted_address: string;
    geometry: {
        location: Coordinates,
        location_type: string,
        viewport: { northeast: Coordinates, southwest: Coordinates }
    };
    partial_match;
    place_id: string;
    types: Array<string>;
}
