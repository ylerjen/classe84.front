export class Event {
    public id: number;
    public title: string;
    public event_date: Date;
    public location: string;
    public organisator: string;

    constructor(props: { [key: string]: any } = {}) {
        this.id = props.id;
        this.title = props.title;
        this.event_date = props.event_date;
        this.location = props.location;
        this.organisator = props.organisator;
    }
}
