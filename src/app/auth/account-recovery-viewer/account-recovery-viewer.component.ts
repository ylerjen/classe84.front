import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
    selector: 'app-account-recovery-viewer',
    templateUrl: './account-recovery-viewer.component.html',
    styleUrls: ['./account-recovery-viewer.component.scss']
})
export class AccountRecoveryViewerComponent {

    public isSending: boolean;

    public isSuccessful: boolean;

    constructor(
        private _authSrvc: AuthService,
        private _notifSrvc: NotificationService,
    ) { }

    ngOnInit() {
    }
    
    sendREcoveryRequest(formValues) {
        this.isSending = true;
        this._authSrvc.recoverPassword(formValues.email)
            .finally(() => this.isSending = false)
            .subscribe(
                (resp: Response) => this.isSuccessful = true,
                err => {
                    if (err.status === 404) {
                        this._notifSrvc.notifyError(`The email '${formValues.email}' is not registered for any member`);
                    }
                }
            );
    }
}
