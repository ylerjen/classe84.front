import { Action } from '@ngrx/store';

import { User } from 'app/models/User';
import { UserActions } from 'app/actions/user.actions';
import { ActionWithPayload } from 'app/actions/app.actions';

export interface IUserState {
    user: User;
    isLoading: boolean;
    errors: Array<Error>
}

export const initialState: IUserState = {
    user: undefined,
    isLoading: false,
    errors: []
};

export function userReducer(state: IUserState = initialState, action: Action): IUserState {
    switch (action.type) {

        case UserActions.getUserStart:
        {
            return {
                ...state,
                isLoading: true,
                user: undefined
            };
        }

        case UserActions.getUserFinished:
        {
            const act = action as ActionWithPayload<User>;
            return {
                ...state,
                user: act.payload,
                isLoading: false
            };
        }

        case UserActions.getUserFailed:
        {
            const act = action as ActionWithPayload<Error>;
            const newState = {
                ...state,
                user: undefined,
                isLoading: false
            };
            newState.errors.push(act.payload);
            return newState;
        }

        case UserActions.updateUser:
        {
            const act = action as ActionWithPayload<User>;
            return {
                ...state,
                user: act.payload
            };
        }

        case UserActions.deleteUser:
            return {
                ...state,
                user: undefined
            };

        case UserActions.resetUserState:
            return initialState;

        default:
            return state;
    }
}
