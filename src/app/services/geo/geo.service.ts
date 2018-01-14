import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { GMAP_API_KEY } from 'app/config/settings';
import { Coordinates } from 'app/models/Coordinates';

const reverse_geocoding_url = 'https://maps.googleapis.com/maps/api/geocode/json';

@Injectable()
export class GeoService {

    constructor(
        private _http: Http,
    ) { }

    /**
     * Find a geolocation (lat/lon) from a given address
     * @param location - the address of the location
     */
    reverseGeocode(location: string): Observable<any> {
        var params = {
            format: 'json',
            address: location,
            sensor: false,
            key: GMAP_API_KEY
        };
        return this._http.get(reverse_geocoding_url, { params })
            .map((resp: Response): IReverseGeoCodeResponse => resp.json());
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
