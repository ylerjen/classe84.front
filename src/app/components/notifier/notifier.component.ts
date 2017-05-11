import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../../stores/appState';
import { Notification } from '../../models/Notification';
import { DELETE_NOTIF } from '../../actions/notifications.actions';

@Component({
    selector: 'app-notifier',
    templateUrl: './notifier.component.html',
    styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent {

    private _notifStore$: Observable<Array<Notification>>;

    constructor(private _store: Store<IAppState>) {
        this._notifStore$ = this._store.select('notificationState');
    }

    removeNotif($event, payload: Notification) {
        $event.preventDefault();
        this._store.dispatch({type: DELETE_NOTIF, payload});
    }
}
