import { Router } from '@angular/router';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ROUTE_URL } from 'app/config/router.config';
import { ForbiddenError } from '@models/ForbiddenError';
import { UnauthorizedError } from '@models/UnauthorizedError';
import { NotificationService } from '@shared/services/notification/notification.service';


const HTTP_STATUS_CODE = {
    ServerDown: 0,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    ServerError: 500,
}

/**
 * This is the interceptor to catch and handle all http requests errors
 */
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _notificationService: NotificationService,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                // retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = 'http request error.';
                    if (error.status === HTTP_STATUS_CODE.ServerDown) {
                        this._notificationService.notifyError(`Veuillez réessayer plus tard, le server est actuellement
                        indisponible. Si le problème persiste, contactez un administrateur du site.`);
                    } else if (error.status === HTTP_STATUS_CODE.Unauthorized) {
                        this._notificationService.notifyError(`Veuillez vous connecter pour pouvoir accéder à cette page.`);
                        this._router.navigate([ROUTE_URL.unauthorized]);
                        return throwError(new UnauthorizedError(errorMessage, error));
                    } else if (error.status === HTTP_STATUS_CODE.Forbidden) {
                        this._notificationService.notifyError(`Vous n'avez pas les droits suffisant pour pouvoir accéder
                        à cette page. Si c'est une erreur, adressez-vous à l'administrateur de l'application.`);
                        this._router.navigate([ROUTE_URL.Forbidden]);
                        return throwError(new ForbiddenError(errorMessage, error));
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
