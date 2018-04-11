import { Component } from '@angular/core';

import { NotificationService } from '@shared/services/notification/notification.service';
import { sendPasswordRecoveryMail } from '@actions/session.actions';
import { Store } from '@ngrx/store';
import { IGlobalState } from '../../stores/globalState';

@Component({
    selector: 'app-account-recovery-viewer',
    templateUrl: './account-recovery-viewer.component.html',
    styleUrls: ['./account-recovery-viewer.component.scss']
})
export class AccountRecoveryViewerComponent {

    public isSending: boolean;

    public isSuccessful: boolean;

    constructor(
        private _store: Store<IGlobalState>,
        private _notifSrvc: NotificationService,
    ) { }

    sendREcoveryRequest(formValues) {
        this._store.dispatch(sendPasswordRecoveryMail(formValues.email));
    }
}
