import { Router, ActivatedRoute } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ROUTE_SEGMENT } from 'app/config/router.config';
import { ForbiddenError } from '@models/ForbiddenError';
import { UnauthorizedError } from '@models/UnauthorizedError';
import { NotificationService } from '@shared/services/notification/notification.service';
import { HTTP_STATUS_CODE } from '@models/Constants';

const excludeUrl = [
    ROUTE_SEGMENT.login,
];

/**
 * Check if the current request url is excluded from the current interceptor
 * @param requestUrl is the url of the current request
 */
function isExcluded(requestUrl: string): boolean {
    for (let i = 0, iMax = excludeUrl.length; i < iMax; i++) {
        const url = excludeUrl[i];
        if (requestUrl.search(`/${url}/gi`) >= 0 ) {
            return true;
        }
    }
    return false;
}

/**
 * This is the interceptor to catch and handle all http requests errors
 */
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _notificationService: NotificationService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isExcluded(request.url)) {
            return next.handle(request);
        }

        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = 'http request error.';
                    if (error.status === HTTP_STATUS_CODE.ServerDown) {
                        this._notificationService.notifyError(`Veuillez réessayer plus tard, le server est actuellement
                        indisponible. Si le problème persiste, contactez un administrateur du site.`);
                    } else if (error.status === HTTP_STATUS_CODE.Unauthorized) {
                        this._notificationService.notifyError(`Veuillez vous connecter pour pouvoir accéder à cette page.`);
                        const redirectTo = this._activatedRoute.snapshot['_routerState'].url;
                        this._router.navigate([ROUTE_SEGMENT.login, { redirectTo }]);
                        return throwError(new UnauthorizedError(errorMessage, error));
                    } else if (error.status === HTTP_STATUS_CODE.Forbidden) {
                        this._notificationService.notifyError(`Vous n'avez pas les droits suffisant pour pouvoir accéder
                        à cette page. Si c'est une erreur, adressez-vous à l'administrateur de l'application.`);
                        this._router.navigate([ROUTE_SEGMENT.forbidden]);
                        return throwError(new ForbiddenError(errorMessage, error));
                    } else if (error.status === HTTP_STATUS_CODE.TooManyRequests) {
                        this._notificationService.notifyError(`Taux d'accès trop fréquents. Veuillez réessayer plus tard.`);
                        this._router.navigate(['/']);
                    } else if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }
                    console.error(errorMessage);
                    return throwError(errorMessage);
                }
            )
        )
    }
}
