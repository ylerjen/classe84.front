export class Address {
    id: string;
    street: string;
    street2: string;
    npa: string;
    city: string;
    state: string;
    country: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
    latitude: string;
    longitude: string;

    constructor(props: {[key: string]: any}) {
        this.id = props.id;
        this.street = props.street;
        this.street2 = props.street2;
        this.npa = props.npa;
        this.city = props.city;
        this.state = props.state;
        this.country = props.country;
        this.is_default = props.is_default || false;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
    }

    toString() {
        const str = [];
        if (this.street) {
            str.push(this.street);
        }
        if (this.street2) {
            str.push(this.street2);
        }
        if (this.npa || this.city) {
            const c = [];
            if (this.npa) {
                c.push(this.npa);
            }
            if (this.city) {
                c.push(this.city);
            }
            if (c.length) {
                str.push(c.join(' '));
            }
        }
        if (this.country) {
            str.push(this.country);
        }
        return str.join(', ');
    }
}
