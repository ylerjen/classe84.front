import { eventReducer, initialState, IEventState } from './event.reducer';

import { Event } from 'app/models/Event';
import {
    resetEventState,
    getEventAsyncStart,
    getEventAsyncFinished,
    updateEvent,
    ASYNC_EVENT_START,
    ASYNC_EVENT_SUCCESS,
    UPDATE_EVENT,
    RESET_EVENT_STATE
} from 'app/actions/event.actions';

describe('eventReducer state', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

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
