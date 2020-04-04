import { User } from './User';
import { Event } from './Event';

export class Subscription {
    public event_id: string;
    public user_id: string;
    public has_paid: number;
    public created_at: Date;
    public user: User | null;
    public event: Event | null;

    /**
     * This property is used to make optimistic action.
     * We change the store even if the request is not finished.
     * The request state will then confirm this value or remove the subscription.
     */
    public isStorePending = false;

    /**
     * This is a comparator to sort subscription list by user fullname
     */
    static sortByFullNameComparator = function(s1: Subscription, s2: Subscription): number {
        if (s1.user.fullname < s2.user.fullname) {
            return -1;
        } else if (s1.user.fullname > s2.user.fullname) {
            return 1;
        } else {
            return 0;
        }
    };

    constructor(props: Partial<Subscription> = {}) {
        this.user = props.user ? new User(props.user) : null;
        this.user_id = props.user ? props.user.id : props.user_id;
        this.event = props.event ? new Event(props.event) : null;
        this.event_id = props.event ? props.event.id : props.event_id;
        this.has_paid = props.has_paid;
        this.created_at = props.created_at;
        this.isStorePending = typeof props.isStorePending === 'undefined' ? false : props.isStorePending;
    }
}
