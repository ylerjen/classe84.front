import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AddNotif } from 'app/actions/notifications.actions';
import { Notification, ENotificationType } from '@models/Notification';

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
        this._store.dispatch(new AddNotif(n));
    }

}
