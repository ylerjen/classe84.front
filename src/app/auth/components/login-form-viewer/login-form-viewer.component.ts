import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { SessionState } from 'app/auth/state/reducers/session.reducer';
import { LoginAction } from 'app/actions/session.actions';
import { Session } from 'app/models/Session';
import { Login } from 'app/models/Login';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { selectSessionState, SessionFeatureState } from 'app/auth/state/selectors/session.selector';

@Component({
    selector: 'app-login-form-viewer',
    templateUrl: './login-form-viewer.component.html',
    styleUrls: ['./login-form-viewer.component.scss']
})
export class LoginFormViewerComponent implements OnInit, OnDestroy {

    private subscription$: ISubscription;

    public session: Session;

    public isLoggingIn: boolean;

    public errorMsg: Array<string>;

    constructor(
        private _store: Store<SessionFeatureState>,
    ) { }

    ngOnInit() {
        this.subscription$ = this._store.select(store => selectSessionState(store))
            .subscribe(
                (state: SessionState) => {
                    this.session = state.session ? state.session : null;
                    this.isLoggingIn = state.isProcessing;
                    this.errorMsg = state.errors;
                }
            );
    }
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    onLogin(creds: Login) {
        this._store.dispatch(new LoginAction(creds));
    }
}
