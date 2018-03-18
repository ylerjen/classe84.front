import { Subscription } from './Subscription';

export class Event {
    public id: string;
    public title: string;
    public event_date: Date;
    public description: string;
    public organisator: string;
    public location: string;
    public latitude: number;
    public longitude: number;
    public link: string;
    public price: string;
    public created_at: string;
    public created_by: string;
    public updated_at: string;
    public subscriberList: Array<Subscription>;

    constructor(props: { [key: string]: any } = {}) {
        this.id = props.id;
        this.title = props.title;
        this.event_date = props.event_date;
        this.description = props.description;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.location = props.location;
        this.link = props.link;
        this.price = props.price;
        this.organisator = props.organisator;
        if (props.created_at && props.created_at.length >= 19) {
            this.created_at = dateTimeToString(props.created_at as string);
        }
        if (props.updated_at && props.updated_at.length >= 19) {
            this.updated_at = dateTimeToString(props.updated_at as string);
        }
        this.created_by = props.created_by;
        this.subscriberList = (props.subscriberList) ? props.subscriberList : [];
    }
}

function dateTimeToString(dt: string): string {
    return `${dt.substr(8, 2)}.${dt.substr(5, 2)}.${dt.substr(0, 4)} ${dt.substr(11, 2)}:${dt.substr(14, 2)}`;
}