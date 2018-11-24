import { Action } from '@ngrx/store';
import { tassign } from 'tassign';

import { User } from 'app/models/User';
import { UserlistActions } from 'app/actions/userlist.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface IUserListState {
    userList: User[];
    isLoading: boolean;
    userFilter: string;
    dataDate: Date;
    errors: Array<Error>
}

export const initialState: IUserListState = {
    userList: [],
    isLoading: false,
    userFilter: '',
    dataDate: null,
    errors: []
};

export function userlistReducer(state: IUserListState = initialState, action: Action): IUserListState {
    switch (action.type) {
        case UserlistActions.GetListStart:
            return tassign(state, {
                isLoading: true
            });

        case UserlistActions.GetListFinished:
        {
            const act = action as ActionWithPayload<Array<User>>;
            return tassign(state, {
                isLoading: false,
                userList: act.payload.slice(),
                dataDate: new Date(),
            });
        }

        case UserlistActions.GetListFailed:
        {
            const act = action as ActionWithPayload<Error>;
            const newState: IUserListState = {
                ...state,
                isLoading: false,
                dataDate: new Date()
            };
            newState.errors.push(act.payload);
            return newState;
        }

        case UserlistActions.AddUserInList:
        {
            const act = action as ActionWithPayload<User>;
            return tassign(state, {
                isLoading: false,
                userList: [
                    ...state.userList,
                    act.payload
                ]
            });
        }

        case UserlistActions.DeleteUserFromList:
        {
         const act = action as ActionWithPayload<User>;
         return tassign(state, {
             isLoading: false,
             userList: state.userList.filter(
                 user => user.id !== act.payload.id
                )
            });
        }

        case UserlistActions.ResetState:
            return tassign(initialState);

        default:
            return state;
    }
}
