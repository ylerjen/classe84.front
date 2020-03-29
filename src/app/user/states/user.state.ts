import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { IUserState, userReducer } from './reducers/user/user.reducer';
import { UserListState, userlistReducer } from './reducers/userlist/userlist.reducer';

export const userModuleFeatureKey = 'userModule';

export interface UserModuleState {
    userState: IUserState;
    userlistState: UserListState;
}

export const userModuleReducers: ActionReducerMap<UserModuleState> = {
    userState: userReducer,
    userlistState: userlistReducer,
};

export const selectUserModuleState = createFeatureSelector<UserModuleState>(userModuleFeatureKey);
