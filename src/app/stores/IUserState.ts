import { User } from '../models/User';

export interface IUserListState {
    userList: User[];
    isLoading: boolean;
    userFilter: string;
}

export interface IUserState {
    user: User;
    isLoading: boolean;
}
