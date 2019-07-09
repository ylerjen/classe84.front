import { User } from 'app/models/User';
import { UserlistActionTypes,
    UserlistActions,
    GetUserListAsyncFinished,
    GetUserListAsyncFailed,
    AddUserInList,
    DeleteUserFromList } from 'app/actions/userlist.actions';

export interface UserListState {
    userList: User[];
    isLoading: boolean;
    userFilter: string;
    dataDate: Date;
    errors: Array<Error>
}

export const initialState: UserListState = {
    userList: [],
    isLoading: false,
    userFilter: '',
    dataDate: null,
    errors: []
};

export function userlistReducer(state: UserListState = initialState, action: UserlistActions): UserListState {
    switch (action.type) {
        case UserlistActionTypes.GetListStart:
        {
            return {
                ...state,
                isLoading: true
            };
        }

        case UserlistActionTypes.GetListFinished:
        {
            const act = action as GetUserListAsyncFinished;
            return {
                ...state,
                isLoading: false,
                userList: act.payload.slice(),
                dataDate: new Date(),
            };
        }

        case UserlistActionTypes.GetListFailed:
        {
            const act = action as GetUserListAsyncFailed;
            const newState: UserListState = {
                ...state,
                isLoading: false,
                dataDate: new Date()
            };
            newState.errors.push(act.payload);
            return newState;
        }

        case UserlistActionTypes.AddUserInList:
        {
            const act = action as AddUserInList;
            return {
                ...state,
                isLoading: false,
                userList: [
                    ...state.userList,
                    act.payload
                ]
            };
        }

        case UserlistActionTypes.DeleteUserFromList:
        {
            const act = action as DeleteUserFromList;
            return {
                ...state,
                isLoading: false,
                userList: state.userList.filter(
                    user => user.id !== act.payload.id
                )
            };
        }

        case UserlistActionTypes.ResetState:
            return initialState;

        default:
            return state;
    }
}
