import { User } from '@models/User';
import { UserActionTypes, UserActions, GetUserFinished, GetUserFailed, UpdateUser } from 'app/user/states/actions/user.actions';

export interface IUserState {
    user: User;
    isLoading: boolean;
    errors: Array<Error>;
}

export const initialState: IUserState = {
    user: undefined,
    isLoading: false,
    errors: [],
};

export function userReducer(state: IUserState = initialState, action: UserActions): IUserState {
    switch (action.type) {

        case UserActionTypes.getUserStart:
        {
            return {
                ...state,
                isLoading: true,
                user: undefined
            };
        }

        case UserActionTypes.getUserFinished:
        {
            const act = action as GetUserFinished;
            return {
                ...state,
                user: act.payload,
                isLoading: false
            };
        }

        case UserActionTypes.getUserFailed:
        {
            const act = action as GetUserFailed;
            const newState = {
                ...state,
                user: undefined,
                isLoading: false
            };
            newState.errors.push(act.payload);
            return newState;
        }

        case UserActionTypes.updateUser:
        {
            const act = action as UpdateUser;
            return {
                ...state,
                user: act.payload
            };
        }

        case UserActionTypes.deleteUser:
            return {
                ...state,
                user: undefined
            };

        case UserActionTypes.resetUserState:
            return initialState;

        default:
            return state;
    }
}
