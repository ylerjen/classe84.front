import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IUserState } from 'app/stores/user/user.reducer';
import { User } from 'app/models/User';
import { ROUTE_URL } from 'app/config/router.config';
import { Address } from 'app/models/Address';
import { getAddressListAsync, setFavoriteAddress } from 'app/actions/addresslist.actions';
import { IGlobalState } from 'app/stores/globalState';
import { IAddressListState } from 'app/stores/addresslist/addresslist.reducer';

@Component({
    selector: 'app-user-detail-viewer',
    templateUrl: './user-detail-viewer.component.html',
    styleUrls: ['./user-detail-viewer.component.scss']
})
export class UserDetailViewerComponent implements OnInit, OnDestroy {

    public user: User;
    public addressList: Array<Address> = [];
    public isLoading: boolean;

    private storeUser$: Observable<IUserState>;
    private storeAddr$: Observable<IAddressListState>;
    private subUser: Subscription;
    private subAddress: Subscription;

    constructor(
        private _store: Store<IGlobalState>,
        private _router: Router
    ) {
        this.storeUser$ = this._store.select('userState');
        this.storeAddr$ = this._store.select('addressListState');
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.subAddress = this.storeAddr$.subscribe(
            (addrState: IAddressListState) => this.addressList = addrState.addressList
        );
        this.subUser = this.storeUser$
            .subscribe(
                (userState: IUserState) => {
                    if (userState.user) {
                        const curUser = new User(userState.user);
                        this.user = curUser;
                        this.isLoading = userState.isLoading;
                        this._store.dispatch(getAddressListAsync(this.user.id.toString()));
                    }
                },
                () => {},
                () => this.isLoading = false
            );
    }

    ngOnDestroy(): void {
        this.subUser.unsubscribe();
        this.subAddress.unsubscribe();
    }

    goToEdit(id: number): void {
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.users}/${id.toString()}/edit`;
        this._router.navigate([url]);
    }

    delete(id: number): void {
        console.log('delete', id);
        throw new Error('not implemented yet');
    }

    onSetFavoriteAddress(addressId: string) {
        const setFavCmd = {
            userId: this.user.id.toString(),
            addressId
        };
        console.log('set favorite address', setFavCmd);
        this._store.dispatch(setFavoriteAddress(setFavCmd));
    }
}
