import { User } from '../models/User';

export interface IUserState {
    userList: User[];
    isLoading: boolean;
    userFilter: string;
}
