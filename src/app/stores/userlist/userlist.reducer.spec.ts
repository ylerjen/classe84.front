import { userlistReducer, initialState, IUserListState } from './userlist.reducer';
import { User } from 'app/models/User';
import {
    ASYNC_USERLIST_START,
    ASYNC_USERLIST_FINISHED,
    ADD_USER_IN_USERLIST,
    DELETE_USER_FROM_USERLIST,
    EMPTY_USERLIST,
    getUserListAsync,
    getUserListAsyncFinished,
    addUserInList,
    deleteUserFromList,
    emptyUserList
} from 'app/actions/userlist.actions';

describe('userlistReducer state', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = userlistReducer(undefined, action);
        expect(result).toEqual(initialState);
    });

    it('should keep the same state if action is not existant', () => {
        const action = { type: 'not registered action' } as any;
        const currentState: IUserListState = {
            isLoading: false,
            userFilter: 'coucou filter',
            userList: [ new User({last_name: 'Grylls', first_name: 'Chuck'}) ]
        };

        const result = userlistReducer(currentState, action);
        expect(result.isLoading).toEqual(currentState.isLoading);
        expect(result.userFilter).toEqual(currentState.userFilter);
        expect(result.userList).toEqual(currentState.userList);
    });

    describe(`#${ASYNC_USERLIST_START}`, () => {
        const action = getUserListAsync;

        it('should set the loading state to true', () => {
            const result = userlistReducer(initialState, action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${ASYNC_USERLIST_FINISHED}`, () => {
        const action = getUserListAsyncFinished;
        const payload = [ new User({id: 1, first_name: 'Chuck', last_name: 'Grylls' })];

        it('should set the loading state to false', () => {
            const result = userlistReducer(initialState, action(payload));
            expect(result.isLoading).toBeFalsy();
        });

        it('should set passed userlist as the new user list state', () => {
            const result = userlistReducer(initialState, action(payload));

            expect(result.userList.length).toBe(payload.length);
        });
    });

    describe(`#${ADD_USER_IN_USERLIST}`, () => {
        const action = addUserInList;
        const currentState: IUserListState = {
            isLoading: false,
            userFilter: '',
            userList: [ new User({id: 1, first_name: 'John', last_name: 'Doh' }) ]
        };
        const payload = new User({id: 2, first_name: 'Chuck', last_name: 'Grylls' });

        it('should add the new user to the current user list', () => {
            const result = userlistReducer(currentState, action(payload));

            expect(result.userList.length).toBe(2);
            expect(result.userList.find(user => user.id === 1)).toBeTruthy();
            expect(result.userList.find(user => user.id === payload.id)).toBeTruthy();
        });
    });

    describe(`#${DELETE_USER_FROM_USERLIST}`, () => {
        const action = deleteUserFromList;
        const payload = new User({id: 2, first_name: 'Chuck', last_name: 'Grylls' });
        const currentState: IUserListState = {
            isLoading: false,
            userFilter: '',
            userList: [ new User({id: 1, first_name: 'John', last_name: 'Doh' }), payload ]
        };

        it('should delete the passed user from the current user list', () => {
            const result = userlistReducer(currentState, action(payload));

            expect(result.userList.length).toBe(1);
            expect(result.userList.find(user => user.id === 1)).toBeTruthy();
            expect(result.userList.find(user => user.id === payload.id)).toBeFalsy();
        });
    });


    describe(`#${EMPTY_USERLIST}`, () => {
        const action = emptyUserList;
        const currentState: IUserListState = {
            isLoading: false,
            userFilter: '',
            userList: [
                new User({id: 1, first_name: 'John', last_name: 'Doh' }),
                new User({id: 2, first_name: 'Chuck', last_name: 'Grylls' })
            ]
        };

        it('should empty the user list state', () => {
            const result = userlistReducer(currentState, action());

            expect(result.userList.length).toBe(0);
        });
    });
});
