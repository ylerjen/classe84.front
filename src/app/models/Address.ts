export class Address {
    id: number;
    street: string;
    street2: string;
    npa: string;
    city: string;
    state: string;
    country: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;

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
    }
}
