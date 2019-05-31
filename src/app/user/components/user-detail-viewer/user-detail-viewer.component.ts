import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable ,  Subscription } from 'rxjs';

import { IUserState } from 'app/stores/user/user.reducer';
import { User } from 'app/models/User';
import { ROUTE_URL } from 'app/config/router.config';
import { Address } from 'app/models/Address';
import { GetAddressListAsync, SetFavoriteAddress } from 'app/actions/addresslist.actions';
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

    private userStore$: Observable<IUserState>;
    private AddressStore$: Observable<IAddressListState>;
    private subUser: Subscription;
    private subAddress: Subscription;

    constructor(
        private _store: Store<IGlobalState>,
        private _router: Router
    ) {
        this.userStore$ = this._store.select(store => store.userState);
        this.AddressStore$ = this._store.select(store => store.addressListState);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.subAddress = this.AddressStore$.subscribe(
            (addrState: IAddressListState) => this.addressList = addrState.addressList
        );
        this.subUser = this.userStore$.subscribe(
            (userState: IUserState) => {
                if (userState.user) {
                    const curUser = new User(userState.user);
                    this.user = curUser;
                    this.isLoading = userState.isLoading;
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.subUser.unsubscribe();
        this.subAddress.unsubscribe();
    }

    goToEdit(id: string): void {
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_URL.users}/${id}/edit`;
        this._router.navigate([url]);
    }

    delete(id: string): void {
        throw new Error('delete user not implemented yet');
        const url = `${ROUTE_URL.users}`;
        this._router.navigate([url]);
    }

    onSetFavoriteAddress(addressId: string) {
        const setFavCmd = {
            userId: this.user.id,
            addressId
        };
        this._store.dispatch(new SetFavoriteAddress(setFavCmd));
    }

    onDeleteAddress(addressId: string) {
        throw new Error(`delete address ${addressId} not implemented yet`);
    }
}
