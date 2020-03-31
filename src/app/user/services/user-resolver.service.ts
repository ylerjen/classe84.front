import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '@models/User';
import { Store, select } from '@ngrx/store';
import { UserModuleState } from '@users/states/user.state';
import { Observable } from 'rxjs';
import { selectUser } from '@users/states/selectors/user.selector';
import { GetUserStart } from '@users/states/actions/user.actions';
import { filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User>  {

    constructor(
        private store: Store<UserModuleState>,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
        const id = route.paramMap.get('id');
        this.initUserData(id);
        return this.waitForUserDataToLoad();
    }

    initUserData(id: string): void {
        this.store.pipe(
            select(selectUser),
        ).subscribe(event => {
            if (!event) {
                this.store.dispatch(new GetUserStart(id));
            }
        });
    }
    waitForUserDataToLoad(): Observable<User> {
        return this.store.pipe(
            select(selectUser),
            filter(userData => !!userData),
            take(1),
        );
    }
}
