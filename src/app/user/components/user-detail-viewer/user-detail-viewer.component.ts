import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';

import { User } from '@models/User';
import { Address } from '@models/Address';
import { ROUTE_SEGMENT } from 'app/config/router.config';
import { IUserState } from 'app/user/states/reducers/user/user.reducer';
import { GlobalState } from 'app/stores/globalState';
import { selectUserState } from 'app/user/states/selectors/user.selector';
import { UserModuleState } from 'app/user/states/user.state';
import { IAddressListState } from 'app/stores/addresslist/addresslist.reducer';
import {
    SetFavoriteAddress,
    DeleteAddressById,
    CreateAddressForUser,
    CreateAddressForUserIdCmd,
    UpdateAddressInList
} from 'app/actions/addresslist.actions';

@Component({
    selector: 'app-user-detail-viewer',
    templateUrl: './user-detail-viewer.component.html',
    styleUrls: ['./user-detail-viewer.component.scss']
})
export class UserDetailViewerComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    private userStore$: Observable<IUserState>;
    private AddressStore$: Observable<IAddressListState>;

    @ViewChild('addressFormModal', { static: false })
    public addressFormModal: ModalDirective;

    public modalRef: BsModalRef | null;
    public user: User;
    public addressList: Array<Address> = [];
    public isLoading: boolean;
    public currentlyEditedAddress: Address;

    constructor(
        private _store: Store<GlobalState|UserModuleState>,
        private _router: Router,
        private modalService: BsModalService,
    ) {
        this.userStore$ = this._store.select((store: UserModuleState) => selectUserState(store));
        this.AddressStore$ = this._store.select((store: GlobalState) => store.addressListState);
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.sub = this.AddressStore$.subscribe(
            (addrState: IAddressListState) => this.addressList = addrState.addressList
        );
        this.sub.add(this.userStore$.subscribe(
            (userState: IUserState) => {
                console.log({ userState });

                if (userState.user) {
                    const curUser = new User(userState.user);
                    this.user = curUser;
                    this.isLoading = userState.isLoading;
                }
            }
        ));

        this.sub.add(
            this.modalService.onHide.subscribe(() => {
                console.log(this.modalRef.content);
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    editUser(id: string): void {
        throw new Error('editUser user not implemented yet');
        if (typeof id === 'undefined') { return; }
        const url = `${ROUTE_SEGMENT.users}/${id}/edit`;
        this._router.navigate([url]);
    }

    deleteUser(id: string): void {
        throw new Error('delete user not implemented yet');
        const url = `${ROUTE_SEGMENT.users}`;
        this._router.navigate([url]);
    }

    addAddress(evt: Event): void {
        evt.preventDefault();
        this.currentlyEditedAddress = new Address();
        this.openModal();
    }

    onSetFavoriteAddress(addressId: string) {
        const setFavCmd = {
            userId: this.user.id,
            addressId
        };
        this._store.dispatch(new SetFavoriteAddress(setFavCmd));
    }

    onEditAddress(addressId: string): void {
        this.currentlyEditedAddress = this.addressList.find( addr => addr.id === addressId);
        this.openModal();
        return;
    }

    onDeleteAddress(addressId: string) {
        this._store.dispatch(new DeleteAddressById(addressId));
    }

    openModal(): void {
        this.modalRef = this.modalService.show(this.addressFormModal, { keyboard: true });
    }

    closeModal(): void {
        if (!this.modalRef) {
          return;
        }

        this.modalRef.hide();
        this.modalRef = null;
    }

    onSaveAddress(address: Address): void {
        if (!address) {
            throw new Error(`Can't save a null address`);
        }
        if (address.id) {
            this._store.dispatch(new UpdateAddressInList(address));
        } else {
            const addressCreationCmd: CreateAddressForUserIdCmd = {
                address,
                userId: this.user.id,
            };
            this._store.dispatch(new CreateAddressForUser(addressCreationCmd));
        }
    }

    onCancelAddressModal(): void {
        // tslint:disable-next-line: max-line-length
        const hasConfirmed = confirm('Vous allez perdre les données saisies. Etes-vous sûr de vouloir annuler et retourner sur la page du membre ?');
        if (!hasConfirmed) {
            return;
        }
        this.currentlyEditedAddress = null;
        this.closeModal();
    }

}
