import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { userlistReducer, initialState, LOAD_USER_SUCCESS } from './userlistReducer';

describe('userlistReducer', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = userlistReducer(undefined, action);
        expect(result).toEqual(initialState);
    });
});
