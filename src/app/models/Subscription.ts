import { User } from './User';
import { Event } from './Event';

export class Subscription {
    public event_id: number;
    public user_id: number;
    public has_paid: number;
    public created_at: Date;
    public updated_at: Date;
    public user: User | null;
    public event: Event | null;
    /**
     * This property is used to make optimistic action.
     * We change the store even if the request is not finished.
     * The request state will then confirm this value or remove the subscription.
     */
    public isStorePending: boolean;

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

    constructor(props: { [key: string]: any } = {}) {
        this.event_id = props.event_id;
        this.user_id = props.user_id;
        this.has_paid = props.has_paid;
        this.created_at = props.created_at;
        this.updated_at = props.updated_at;
        this.user = props.user ? new User(props.user) : null;
        this.event = props.event ? new Event(props.event) : null;
        this.isStorePending = typeof props.isStorePending === 'undefined' ? false : props.isStorePending;
    }
}
