import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MapquestResultPayload } from './Mapquest';
import { MapquestCoordinates } from './MapquestCoordinates';

export const mapQuestKey = '2fUpwSXT0FPFJQSZG3quuUa282RBNhh7';
export const mapQuestMapUrl = 'https://www.mapquestapi.com/staticmap/v5/map';
const mapQuestGeocodingUrl = 'https://www.mapquestapi.com/geocoding/v1/address';


/**
 * Create a url to a static map
 * @param coord - the coordinate to display in the map
 * @param size - the size of the img map
 * @param marker - the marker to use to display the address
 */
export function mapLinkBuilder(coord: MapquestCoordinates, size: number = 400, marker: string = 'marker'): URL {
    if (!coord || !coord.lat || ! coord.lng) {
        throw new Error(`Map coordinate can't be empty`);
    }
    const url = new URL(mapQuestMapUrl);
    url.searchParams.set('locations', `${coord.lat},${coord.lng}`);
    url.searchParams.set('size', `${size},${size}`);
    url.searchParams.set('key', mapQuestKey);
    return url;
}

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
        const url = new URL(mapQuestGeocodingUrl);
        let params = new HttpParams();
        params = params.set('key', mapQuestKey);
        params = params.set('location', location);
        params = params.set('outFormat', 'json');
        return this._http.get<MapquestResultPayload>(url.toString(), { params });
    }
}
