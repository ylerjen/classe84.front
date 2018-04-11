import { Component } from '@angular/core';

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
    ) { }

    sendREcoveryRequest(formValues) {
        this._store.dispatch(sendPasswordRecoveryMail(formValues.email));
    }
}
