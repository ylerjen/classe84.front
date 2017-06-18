import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addNotif, deleteNotif } from '../../actions/notifications.actions';
import { Notification, ENotificationType } from '../../models/Notification';

@Injectable()
export class NotificationService {

    constructor(private _store: Store<Array<Notification>>) { }

    notifyError(msg: string): void {
        const n = new Notification(msg, ENotificationType.ERROR);
        this._store.dispatch(addNotif(n));
        setTimeout(() => this._store.dispatch(deleteNotif(n)), 15000);
    }

}
