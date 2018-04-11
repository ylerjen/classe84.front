import { Action } from '@ngrx/store';

import { Address } from 'app/models/Address';
import { addressActions, UserAddressCmd } from 'app/actions/addresslist.actions';
import { ActionWithPayload } from 'app/actions/app.actions';
import { tassign } from 'tassign';

export interface IAddressListState {
    addressList: Address[];
    isLoading: boolean;
}

export const initialState: IAddressListState = {
    addressList: [],
    isLoading: false
};

export function addresslistReducer(state: IAddressListState = initialState, action: Action): IAddressListState {
    switch (action.type) {
        case addressActions.asyncAddresslistStart:
            return tassign(state, {
                isLoading: true
            });

        case addressActions.asyncAddresslistFinished:
        {
            const act = action as ActionWithPayload<Array<Address>>;
            return tassign(state, {
                isLoading: false,
                addressList: act.payload
            });
        }

        case addressActions.addAddressInAddresslist:
        {
            const act = action as ActionWithPayload<Address>;
            return tassign(state, {
                isLoading: false,
                addressList: [
                    ...state.addressList,
                    act.payload
                ]
            });
        }

        case addressActions.updateAddressInAddresslist:
        {
            const act = action as ActionWithPayload<Address>;
            return tassign(state, {
                isLoading: false,
                addressList: [
                    ...state.addressList,
                    act.payload
                ]
            });
        }

        case addressActions.deleteAddressFromAddresslist:
        {
            const act = action as ActionWithPayload<Address>;
            return tassign(state, {
                isLoading: false,
                addressList: state.addressList.filter(addr => addr.id !== act.payload.id)
            });
        }

        case addressActions.resetAddresslist:
            return tassign(state, {
                isLoading: false,
                addressList: []
            });

        case addressActions.setFavoriteAddress:
        {
            const act = action as ActionWithPayload<UserAddressCmd>;
            return tassign(state, {
                isLoading: false,
                addressList: state.addressList.map(addr => {
                    addr.is_default = (addr.id.toString() === act.payload.addressId);
                    return addr;
                })
            });
        }

        default:
            return state;
    }
}
