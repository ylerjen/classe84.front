import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';

import { Subscription } from 'app/models/Subscription';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from '@models/User';

@Component({
    selector: 'app-event-subscriptions',
    templateUrl: './event-subscriptions.component.html',
    styleUrls: ['./event-subscriptions.component.scss']
})
export class EventSubscriptionsComponent implements OnInit {

    protected searchStr: string;

    protected dataService: CompleterData;

    @Input() public isEditable = false;

    @Input() public subscribersList: Array<User>;

    /**
     * List used as a result for the autocomplete
     */
    @Input() public searchableList: Array<CompleterItem>;

    @Output() public addSubscriptionEmitter = new EventEmitter<any>();
    @Output() public removeSubscriptionEmitter = new EventEmitter<string>();

    constructor(
        private completerService: CompleterService
    ) { }

    ngOnInit() {
        this.dataService = this.completerService.local(this.searchableList, 'title', 'title');
    }

    addUserSubscription(selectedValue: CompleterItem) {
        if (typeof selectedValue === 'undefined') {
            return;
        }
        this.addSubscriptionEmitter.emit(selectedValue.originalObject);
    }

    removeUserSubscription(id: string) {
        if (typeof id === 'undefined') {
            return;
        }
        this.removeSubscriptionEmitter.emit(id);
    }
}
