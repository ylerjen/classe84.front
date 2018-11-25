export class Event {
    public id: string;
    public title: string;
    public start_date: Date;
    public end_date: Date;
    public description: string;
    public organisator: string;
    public location: string;
    public latitude: number;
    public longitude: number;
    public link: string;
    public price: string;
    public created_at: Date;
    public created_by: string;
    public updated_at: Date;

    constructor(props: { [key: string]: any } = {}) {
        this.id = props.id;
        this.title = props.title;
        this.start_date = props.start_date;
        this.end_date = props.end_date;
        this.description = props.description;
        this.latitude = props.latitude;
        this.longitude = props.longitude;
        this.location = props.location;
        this.link = props.link;
        this.price = props.price;
        this.organisator = props.organisator;
        this.created_at = multiTypeDateToDate(props.created_at);
        this.updated_at = multiTypeDateToDate(props.updated_at);
        this.created_by = props.created_by;
    }
}

function dateTimeToString(dt: string): string {
    return `${dt.substr(8, 2)}.${dt.substr(5, 2)}.${dt.substr(0, 4)} ${dt.substr(11, 2)}:${dt.substr(14, 2)}`;
}

function multiTypeDateToDate(refDate: string | Date): Date {
    if (!refDate) {
        return null;
    } else if (typeof refDate === 'string') {
        return new Date(refDate);
    } else if (typeof refDate === 'object' && typeof refDate.getHours === 'function') {
        return refDate;
    }

    return null;
}
