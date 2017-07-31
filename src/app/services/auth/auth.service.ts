import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { ROUTE_URL } from '../../config/router.config';
import { IGlobalState } from '../../stores/globalState';
import { ISessionState } from '../../stores/session/session.reducer';

export const LS_TOKEN_KEY = 'jwt-token';

@Injectable()
export class AuthService implements CanActivate {
    private _isLoggedIn = false;

    constructor(
        private _store: Store<IGlobalState>,
        private _router: Router,
    ) {
        this._store.select('sessionState')
            .subscribe((sessionState: ISessionState) => {
                this._isLoggedIn = sessionState.isLoggedIn;
            });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._isLoggedIn) {
            return true;
        } else {
            const redirectTo = state.url;
            // FIXME ROUTE_URL POSE PROBLEME LORSQU'IL EST UTILISE ICI
            this._router.navigate(['login'/*ROUTE_URL.login*/, { redirectTo }]);
            return false;
        }
    }
}

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    const config = new AuthConfig({
        tokenName: LS_TOKEN_KEY,
        tokenGetter: (() => sessionStorage.getItem(LS_TOKEN_KEY)),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        // noJwtError: true, // true = if jwt is missing fallback to simple http
    });
    return new AuthHttp(config, http, options);
}
