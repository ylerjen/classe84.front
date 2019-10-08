import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable ,  Subscription } from 'rxjs';

import { User } from '@models/User';
import { Address } from '@models/Address';
import { ROUTE_URL } from 'app/config/router.config';
import { GlobalState } from 'app/stores/globalState';
import { IUserState } from 'app/stores/user/user.reducer';
import { SetFavoriteAddress, DeleteAddressById } from 'app/actions/addresslist.actions';
import { IAddressListState } from 'app/stores/addresslist/addresslist.reducer';
import { selectUserState } from 'app/stores/user/selectors/user.selector';

@Component({
    selector: 'app-user-detail-viewer',
    templateUrl: './user-detail-viewer.component.html',
    styleUrls: ['./user-detail-viewer.component.scss']
})
export class UserDetailViewerComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    private userStore$: Observable<IUserState>;
    private AddressStore$: Observable<IAddressListState>;

    public user: User;
    public addressList: Array<Address> = [];
    public isLoading: boolean;

    constructor(
        private _store: Store<GlobalState>,
        private _router: Router
    ) {
        this.userStore$ = this._store.select(store => selectUserState(store));
        this.AddressStore$ = this._store.select(store => store.addressListState);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.sub = this.AddressStore$.subscribe(
            (addrState: IAddressListState) => this.addressList = addrState.addressList
        );
        this.sub.add(this.userStore$.subscribe(
            (userState: IUserState) => {
                console.log({userState});

                if (userState.user) {
                    const curUser = new User(userState.user);
                    this.user = curUser;
                    this.isLoading = userState.isLoading;
                }
            }
        ));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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
        this._store.dispatch(new DeleteAddressById(addressId));
    }
}
