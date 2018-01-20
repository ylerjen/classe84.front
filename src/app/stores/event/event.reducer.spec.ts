import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';

import { eventReducer, initialState, IEventState } from './event.reducer';

import { Event } from 'app/models/Event';
import { Subscription } from 'app/models/Subscription';
import { User } from 'app/models/User';
import {
    resetEventState,
    getEventAsyncStart,
    getEventAsyncFinished,
    setSubscribersToEvent,
    updateEvent,
    SET_EVENT_SUBSCRIBERS,
    ASYNC_EVENT_START,
    ASYNC_EVENT_SUCCESS,
    UPDATE_EVENT,
    RESET_EVENT_STATE
} from 'app/actions/events.actions';

describe('eventReducer state', () => {

    it('should have a default value on init', () => {
        const action = {} as any;
        const currentState = initialState;

        const result = eventReducer(undefined, action);
        
        expect(result.isLoading).toBe(initialState.isLoading);
        expect(result.event).toBe(initialState.event);
    });

    describe(`#${ASYNC_EVENT_START} action`, () => {
        const action = getEventAsyncStart;

        it('should set the loading state', () => {
            const currentState = initialState;

            const result = eventReducer(currentState, action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${ASYNC_EVENT_SUCCESS} action`, () => {
        const action = getEventAsyncFinished;
        const newEvtObj = new Event({ id: 1, title: 'The title of the event' });

        it('should set the loading state', () => {
            const currentState = initialState;

            const result = eventReducer(currentState, action(newEvtObj));

            expect(result.isLoading).toBeFalsy();
        });

        it('should set the event object in the state', () => {
            const currentState = initialState;

            const result = eventReducer(currentState, action(newEvtObj));

            expect(result.event.id).toBe(newEvtObj.id);
            expect(result.event.title).toBe(newEvtObj.title);
        });
    });

    describe(`#${UPDATE_EVENT} action`, () => {
        const action = updateEvent;
        const initialState: IEventState = {
            isLoading: false,
            event: new Event({ id: 1, title: 'The title of the event' })
        };
        const updatedEvtObj = new Event({ id: 1, title: 'The new title' });

        it('should update the event model with the new values', () => {
            const currentState = initialState;

            const result = eventReducer(currentState, action(updatedEvtObj));

            expect(result.event.title).toBe(updatedEvtObj.title);
        });
    });

    describe(`#${SET_EVENT_SUBSCRIBERS} to the event state action`, () => {
        const action = setSubscribersToEvent;

        it('should throw if the event is not initialized', () => {
            const currentState = initialState;

            const reducerCall = () => {
                eventReducer(currentState, action([]));
            };

            expect(reducerCall).toThrow();
        });

        it(`should set the subscriber's list to the event`, () => {
            const currentState: IEventState = {
                isLoading: false,
                event: new Event({ id: 1, title: 'The title of the event' })
            };
            const subscrList = [ new Subscription({
                created_at: 'Sat Jan 20 2018 18:34:22 GMT+0100 (CET)',
                updated_at: 'Sat Jan 20 2018 18:34:22 GMT+0100 (CET)',
                user_id: 0,
                User: new User({id: 0, first_name: 'yann', last_name: 'chuck' })
            })];

            const result = eventReducer(currentState, action(subscrList));

            expect(result.event.subscriberList).toEqual(subscrList);
        });
    });

    describe(`#${RESET_EVENT_STATE} action`, () => {
        const action = resetEventState;
        it(`should reset the state to the initial state`, () => {
            const currentState: IEventState = { 
                isLoading: true,
                event: new Event({title: 'coucou'})
            };
            const result = eventReducer(currentState, action());

            expect(result.isLoading).toBeFalsy();
            expect(result.event).toBeUndefined();
        });
    });
});
