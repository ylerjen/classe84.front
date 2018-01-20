import { User } from "./User";
import { Event } from "./Event";

export class Subscription {
    public event_id: number;
    public user_id: number;
    public has_paid: number;
    public created_at: Date;
    public updated_at: Date;
    public user: User | null;
    public event: Event | null;

    constructor(props: { [key: string]: any } = {}) {
        this.event_id = props.event_id;
        this.user_id = props.user_id;
        this.has_paid = props.has_paid;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
        this.user = props.user ? new User(props.user) : null;
        this.event = props.event ? new Event(props.event) : null;
    }
}