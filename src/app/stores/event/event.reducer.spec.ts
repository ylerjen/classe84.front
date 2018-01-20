import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { GET_EVENT } from 'app/actions/events.actions';
import { eventReducer , initialState } from './event.reducer';

describe('eventReducer state', () => {

    it('should have a default value on init', () => {
        const action = {} as any;

        const result = eventReducer(undefined, action);
        expect(result).toEqual(initialState);
    });

    it(`should contain an event after the ${GET_EVENT} action`, () => {

    });
});
