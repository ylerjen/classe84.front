import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from 'app/services/auth/auth.service';
import { ISessionState } from 'app/stores/session/session.reducer';
import { login } from 'app/actions/session.actions';
import { Session } from 'app/models/Session';
import { Login } from 'app/models/Login';
import { IGlobalState } from 'app/stores/globalState';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-login-form-viewer',
    templateUrl: './login-form-viewer.component.html',
    styleUrls: ['./login-form-viewer.component.scss']
})
export class LoginFormViewerComponent implements OnInit, OnDestroy {

    private subscription$: ISubscription;

    public session: Session;

    public errorMsg: string;

    constructor(
        private _store: Store<IGlobalState>,
        private _authSrvc: AuthService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.subscription$ = this._store.select('sessionState')
            .subscribe(
                (state: ISessionState) => this.session = state.session ? state.session : null
            );
    }
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    onLogin(creds: Login) {
        if (creds.remember) {
            // TODO create this part but with secure cred mgmt
            // this._authSrvc.setRememberedCreds(creds);
        }

        // TODO improve this redirection by calling an effect
        const successCb = () => this._route.params
            .subscribe((data: Params) => {
                if (data.redirectTo) {
                    this._router.navigate([data.redirectTo]);
                }
            });

        this._store.dispatch(login(creds, successCb));
    }
}
