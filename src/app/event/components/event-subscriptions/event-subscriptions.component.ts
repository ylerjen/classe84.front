import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { User } from '@models/User';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';

@Component({
    selector: 'app-event-subscriptions',
    templateUrl: './event-subscriptions.component.html',
    styleUrls: ['./event-subscriptions.component.scss']
})
export class EventSubscriptionsComponent {

    /**
     * The value given in the form as search criteria
     */
    protected searchStr: string;

    @Input()
    public isEditable = false;

    /**
     * List of user that have subscribed to the event
     */
    @Input()
    public subscribersList: Array<string>;

    /**
     * List used as a result for the autocomplete
     */
    @Input()
    public searchableList: Array<User> = [];

    @Output()
    public addSubscriptionEmitter = new EventEmitter<any>();

    @Output()
    public removeSubscriptionEmitter = new EventEmitter<string>();

    @ViewChild('userSubscriptionSearch', { static: false })
    searchField: ElementRef;

    setFocus(): void {
        this.searchField.nativeElement.focus();
    }

    addUserSubscription(selectedValue: TypeaheadMatch): void {
        this.searchStr = '';
        if (typeof selectedValue.value === 'undefined') {
            return;
        }
        this.addSubscriptionEmitter.emit(selectedValue.item);
        this.setFocus();
    }

    removeUserSubscription(id: string) {
        if (!id) {
            return;
        }
        this.removeSubscriptionEmitter.emit(id);
    }
}
