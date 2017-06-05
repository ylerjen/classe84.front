import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { notificationReducer, initialState } from './notifications.reducer';

describe('userlistReducer', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = notificationReducer(undefined, action);
        expect(result).toEqual(initialState);
    });
});
