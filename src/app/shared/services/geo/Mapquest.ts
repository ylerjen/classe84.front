import { MapquestCoordinates } from './MapquestCoordinates';

export interface MapquestResultPayload {
    info: MapquestResultInfo;
    options: MapquestResultOptions;
    results: Array<MapquestResult>
}

interface MapquestResultInfo {
    statuscode: number;
    messages: Array<string>;
}

interface MapquestResultOptions {
    maxResults: number;
    thumbMaps: boolean;
    ignoreLatLngInput: boolean;
}

export interface MapquestResult {
    providedLocation: MapquestResultProvidedlocation;
    locations: Array<MapquestResultLocations>;
}

interface MapquestResultProvidedlocation {
    location: string;
}

export interface MapquestResultLocations {
    street: string;
    adminArea6: string;
    adminArea6Type: string;
    adminArea5: string;
    adminArea5Type: string;
    adminArea4: string;
    adminArea4Type: string;
    adminArea3: string;
    adminArea3Type: string;
    adminArea1: string;
    adminArea1Type: string;
    postalCode: string;
    geocodeQualityCode: string;
    geocodeQuality: string;
    dragPoint: boolean;
    sideOfStreet: string;
    linkId: string;
    unknownInput: string;
    type: string;
    latLng: MapquestCoordinates;
    displayLatLng: MapquestCoordinates;
    mapUrl?: string;
}
