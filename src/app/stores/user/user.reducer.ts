import { Action } from '@ngrx/store';
import { tassign } from 'tassign';

import { User } from 'app/models/User';
import { UserActions } from 'app/actions/user.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface IUserState {
    user: User;
    isLoading: boolean;
}

export const initialState: IUserState = {
    user: undefined,
    isLoading: false
};

export function userReducer(state: IUserState = initialState, action: Action): IUserState {
    switch (action.type) {

        case UserActions.getUserStart:
            return tassign(state, { isLoading: true });

        case UserActions.getUserFinished:
        {
            const act = action as ActionWithPayload<User>;
            return tassign(state, { user: act.payload, isLoading: false });
        }

        case UserActions.updateUser:
        {
            const act = action as ActionWithPayload<User>;
            return tassign(state, { user: act.payload });
        }

        case UserActions.deleteUser:
            return tassign(state, { user: undefined });

        case UserActions.resetUserState:
            return tassign(initialState);

        default:
            return state;
    }
}
