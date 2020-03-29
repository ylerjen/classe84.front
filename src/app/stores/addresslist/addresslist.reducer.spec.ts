import { addresslistReducer, initialState, IAddressListState } from './addresslist.reducer';

import { Address } from '@models/Address';
import {
    getAddressListAsync,
    getAddressListAsyncFinished,
    addAddressInList,
    updateAddressInList,
    deleteAddressFromList,
    emptyAddressList,
    ASYNC_ADDRESSLIST_START,
    ASYNC_ADDRESSLIST_FINISHED,
    UPDATE_ADDRESS_IN_ADDRESSLIST,
    RESET_ADDRESSLIST
} from 'app/actions/addresslist.actions';

describe('addresslistReducer state', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = addresslistReducer(undefined, action);

        expect(result.isLoading).toBe(initialState.isLoading);
        expect(result.addressList).toBe(initialState.addressList);
    });

    describe(`#${ASYNC_ADDRESSLIST_START} action`, () => {
        const action = getAddressListAsync;

        it('should set the loading state', () => {
            const currentState = initialState;

            const result = addresslistReducer(currentState, action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${ASYNC_ADDRESSLIST_FINISHED} action`, () => {
        const action = getAddressListAsyncFinished;
        const newAddrArr = [new Address({ id: 1, street: 'Testing street 1337', country: 'Switzerland' })];

        it('should set the loading state', () => {
            const currentState = initialState;

            const result = addresslistReducer(currentState, action(newAddrArr));

            expect(result.isLoading).toBeFalsy();
        });

        it('should set the event object in the state', () => {
            const currentState = initialState;

            const result = addresslistReducer(currentState, action(newAddrArr));

            expect(result.addressList.length).toBe(newAddrArr.length);
            expect(result.addressList[0].id).toBe(newAddrArr[0].id);
        });
    });

    describe(`#${UPDATE_ADDRESS_IN_ADDRESSLIST} action`, () => {
        const action = updateAddressInList;
        const initialState: IAddressListState = {
            isLoading: false,
            addressList: [new Address({ id: 1, street: 'The street name', country: 'Switzerland' })]
        };
        const updatedAddrObj = new Address({ id: 1, street: 'The new street name' });

        it('should update the address model with the new values', () => {
            const currentState = initialState;

            const result = addresslistReducer(currentState, action(updatedAddrObj));

            expect(result.addressList[0].street).toBe(updatedAddrObj.street);
        });
    });

    describe(`#${RESET_ADDRESSLIST} action`, () => {
        const action = emptyAddressList;
        it(`should reset the state to the initial state`, () => {
            const currentState: IAddressListState = {
                isLoading: true,
                addressList: [new Address({id: 1, street: 'coucou'})]
            };
            const result = addresslistReducer(currentState, action());

            expect(result.isLoading).toBeFalsy();
            expect(result.addressList.length).toBe(0);
        });
    });
});
