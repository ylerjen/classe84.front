import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export const LS_TOKEN_KEY = 'jwt-token';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    const config = new AuthConfig({
        tokenName: LS_TOKEN_KEY,
        tokenGetter: (() => sessionStorage.getItem(LS_TOKEN_KEY)),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        // noJwtError: true, // true = if jwt is missing fallback to simple http
    });
    return new AuthHttp(config, http, options);
}
