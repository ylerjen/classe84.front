import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IGlobalState } from 'app/stores/globalState';
import { Notification } from 'app/models/Notification';
import { deleteNotif } from 'app/actions/notifications.actions';

@Component({
    selector: 'app-notifier',
    templateUrl: './notifier.component.html',
    styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent {

    public _notifStore$: Observable<Array<Notification>>;

    constructor(private _store: Store<IGlobalState>) {
        this._notifStore$ = this._store.select(store => store.notificationState);
    }

    removeNotif($event, payload: Notification) {
        $event.preventDefault();
        this._store.dispatch(deleteNotif(payload));
    }
}
