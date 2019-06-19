import { Address } from 'app/models/Address';
import {
    addressActions,
    DeleteAddressById,
    GetAddressListAsyncFinished,
    AddAddressInList,
    UpdateAddressInList,
    SetFavoriteAddress,
    AddressListActions } from 'app/actions/addresslist.actions';

export interface IAddressListState {
    addressList: Address[];
    isLoading: boolean;
}

export const initialState: IAddressListState = {
    addressList: [],
    isLoading: false
};

export function addresslistReducer(state: IAddressListState = initialState, action: AddressListActions): IAddressListState {
    switch (action.type) {
        case addressActions.asyncAddresslistStart: {
            return {
                ...state,
                isLoading: true
            };
        }

        case addressActions.asyncAddresslistFinished: {
            const act = action as GetAddressListAsyncFinished;
            return {
                ...state,
                isLoading: false,
                addressList: act.payload
            };
        }

        case addressActions.addAddressInAddresslist: {
            const act = action as AddAddressInList;
            return {
                ...state,
                isLoading: false,
                addressList: [
                    ...state.addressList,
                    act.payload
                ]
            };
        }

        case addressActions.updateAddressInAddresslist: {
            const act = action as UpdateAddressInList;
            return {
                ...state,
                isLoading: false,
                addressList: [
                    ...state.addressList,
                    act.payload
                ]
            };
        }

        case addressActions.deleteAddressFromAddresslist: {
            const act = action as DeleteAddressById;
            return {
                ...state,
                isLoading: false,
                addressList: state.addressList.filter(addr => addr.id !== act.payload)
            };
        }

        case addressActions.resetAddresslist:
            return {
                ...state,
                isLoading: false,
                addressList: []
            };

        case addressActions.setFavoriteAddress:
        {
            const act = action as SetFavoriteAddress;
            return {
                ...state,
                isLoading: false,
                addressList: state.addressList.map(addr => {
                    addr.is_default = (addr.id.toString() === act.payload.addressId);
                    return addr;
                })
            };
        }

        default:
            return state;
    }
}
