import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { addNotif, deleteNotif } from 'app/actions/notifications.actions';
import { Notification, ENotificationType } from 'app/models/Notification';

@Injectable()
export class NotificationService {

    constructor(private _store: Store<Array<Notification>>) { }

    notifyError(msg: string): void {
        this.notify(msg, ENotificationType.ERROR);
    }

    notifySuccess(msg: string): void {
        this.notify(msg, ENotificationType.SUCCESS);
    }

    notify(msg: string, type: ENotificationType): void {
        const n = new Notification(msg, type);
        this._store.dispatch(addNotif(n));
        setTimeout(() => this._store.dispatch(deleteNotif(n)), 15000);
    }

}
