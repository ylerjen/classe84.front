import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../../stores/appState';
import { Notification } from '../../models/Notification';

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
}
