export class MapquestCoordinates {
    constructor(public lat: string, public lng: string) { }

    toString(): string {
        return this.lat + ', ' + this.lng;
    }
}
