import { userReducer, initialState, IUserState } from './user.reducer';

import { User } from '@models/User';
import {
    ASYNC_USER_START,
    ASYNC_USER_FINISHED,
    UPDATE_USER,
    RESET_USER_STATE,
    resetUserState,
    getUserAsyncStart,
    getUserAsyncFinished,
    updateUser,
} from 'app/actions/user.actions';

describe('userReducer state', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = userReducer(undefined, action);

        expect(result.isLoading).toBe(initialState.isLoading);
        expect(result.user).toBe(initialState.user);
    });

    describe(`#${ASYNC_USER_START} action`, () => {
        const action = getUserAsyncStart;

        it('should set the loading state', () => {
            const currentState = initialState;

            const result = userReducer(currentState, action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${ASYNC_USER_FINISHED} action`, () => {
        const action = getUserAsyncFinished;
        const newUserObj = new User({ id: 1, first_name: 'John', last_name: 'Doh' });

        it('should set the loading state', () => {
            const currentState = initialState;

            const result = userReducer(currentState, action(newUserObj));

            expect(result.isLoading).toBeFalsy();
        });

        it('should set the event object in the state', () => {
            const currentState = initialState;

            const result = userReducer(currentState, action(newUserObj));

            expect(result.user.id).toBe(newUserObj.id);
            expect(result.user.first_name).toBe(newUserObj.first_name);
            expect(result.user.last_name).toBe(newUserObj.last_name);
        });
    });

    describe(`#${UPDATE_USER} action`, () => {
        const action = updateUser;
        const initialState: IUserState = {
            isLoading: false,
            user: new User({ id: 1, first_name: 'John', last_name: 'Doh' })
        };
        const updatedUserObj = new User({ id: 1, first_name: 'Jane', last_name: 'Doh' });

        it('should update the event model with the new values', () => {
            const currentState = initialState;

            const result = userReducer(currentState, action(updatedUserObj));

            expect(result.user.first_name).toBe(updatedUserObj.first_name);
            expect(result.user.last_name).toBe(updatedUserObj.last_name);
        });
    });

    describe(`#${RESET_USER_STATE} action`, () => {
        const action = resetUserState;
        it(`should reset the state to the initial state`, () => {
            const currentState: IUserState = { 
                isLoading: true,
                user: new User({ id: 1, first_name: 'John', last_name: 'Doh' })
            };
            const result = userReducer(currentState, action());

            expect(result.isLoading).toBeFalsy();
            expect(result.user).toBeUndefined();
        });
    });
});
