import { Component } from '@angular/core';

import { SendPasswordRecoveryMail } from '@actions/session.actions';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../stores/globalState';

@Component({
    selector: 'app-account-recovery-viewer',
    templateUrl: './account-recovery-viewer.component.html',
    styleUrls: ['./account-recovery-viewer.component.scss']
})
export class AccountRecoveryViewerComponent {

    public isSending: boolean;

    public isSuccessful: boolean;

    constructor(
        private _store: Store<GlobalState>,
    ) { }

    sendREcoveryRequest(formValues) {
        console.log('dispatch', formValues);
        this._store.dispatch(new SendPasswordRecoveryMail(formValues.email));
    }
}
