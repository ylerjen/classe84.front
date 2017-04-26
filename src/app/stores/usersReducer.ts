import { ActionReducer, Action } from '@ngrx/store';

import { User, EGender } from '../models/User';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const RESET = 'RESET';
export const EMPTY = 'EMPTY';

const resetState: User[] = [{
    id: 0,
    first_name: 'John',
    last_name: 'Doh',
    maiden_name: '',
    birthdate: new Date(),
    gender: EGender.Male,
    email: '',
    fb_profile_name: '',
    fb_user_id: '',
    is_active: true,
    mobile: '',
    phone: '',
    website: ''
}];

export function usersReducer(state: User[] = resetState, action: Action) {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload];

        case DELETE_USER:
            return state;

        case EMPTY:
            return [];

        case RESET:
            return resetState;

        default:
            return state;
    }
}