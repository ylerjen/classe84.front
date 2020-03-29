import { eventlistReducer, initialState, IEventListState } from './eventlist.reducer';
import { Event } from '@models/Event';
import {
    ASYNC_EVENTLIST_START,
    ASYNC_EVENTLIST_FINISHED,
    ADD_EVENT_IN_EVENTLIST,
    DELETE_EVENT_FROM_EVENTLIST,
    EMPTY_EVENTLIST,
    getEventListAsyncStart,
    getEventListAsyncFinished,
    addEventInlist,
    deleteEventFromList,
    emptyEventList
} from 'app/actions/eventlist.actions';

describe('eventlistReducer state', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = eventlistReducer(undefined, action);
        expect(result).toEqual(initialState);
    });

    it('should keep the same state if action is not existant', () => {
        const action = { type: 'not registered action' } as any;
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: 'coucou filter',
            eventList: [ new Event({id: 1, title: 'Souper 34', organisator: 'Chuck'}) ]
        };

        const result = eventlistReducer(currentState, action);
        expect(result.isLoading).toEqual(currentState.isLoading);
        expect(result.eventFilter).toEqual(currentState.eventFilter);
        expect(result.eventList).toEqual(currentState.eventList);
    });

    describe(`#${ASYNC_EVENTLIST_START}`, () => {
        const action = getEventListAsyncStart;

        it('should set the loading state to true', () => {
            const result = eventlistReducer(initialState, action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${ASYNC_EVENTLIST_FINISHED}`, () => {
        const action = getEventListAsyncFinished;
        const payload = [ new Event({id: 1, title: 'Souper 2345', organisator: 'Grylls' }) ];

        it('should set the loading state to false', () => {
            const result = eventlistReducer(initialState, action(payload));

            expect(result.isLoading).toBeFalsy();
        });

        it('should set passed eventlist as the new event list state', () => {
            const result = eventlistReducer(initialState, action(payload));

            expect(result.eventList.length).toBe(payload.length);
        });
    });

    describe(`#${ADD_EVENT_IN_EVENTLIST}`, () => {
        const action = addEventInlist;
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: '',
            eventList: [ new Event({id: 1, title: 'Souper 2345', organisator: 'Grylls' }) ]
        };
        const payload = new Event({id: 2, title: 'Voyage 2345', organisator: 'Grylls' });

        it('should add the new event to the current event list', () => {
            const result = eventlistReducer(currentState, action(payload));

            expect(result.eventList.length).toBe(2);
            expect(result.eventList.find(event => event.id === 1)).toBeTruthy();
            expect(result.eventList.find(event => event.id === payload.id)).toBeTruthy();
        });
    });

    describe(`#${DELETE_EVENT_FROM_EVENTLIST}`, () => {
        const action = deleteEventFromList;
        const payload = new Event({id: 2, title: 'Voyage 2345', organisator: 'Grylls' });
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: '',
            eventList: [
                new Event({id: 1, title: 'Souper 2345', organisator: 'Chuck' }),
                payload
            ]
        };

        it('should delete the passed event from the current event list', () => {
            const result = eventlistReducer(currentState, action(payload));

            expect(result.eventList.length).toBe(1);
            expect(result.eventList.find(event => event.id === 1)).toBeTruthy();
            expect(result.eventList.find(event => event.id === payload.id)).toBeFalsy();
        });
    });


    describe(`#${EMPTY_EVENTLIST}`, () => {
        const action = emptyEventList;
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: '',
            eventList: [
                new Event({id: 1, title: 'Souper 2345', organisator: 'Chuck' }),
                new Event({id: 2, title: 'Voyage 2345', organisator: 'Grylls' })
            ]
        };

        it('should empty the event list state', () => {
            const result = eventlistReducer(currentState, action());

            expect(result.eventList.length).toBe(0);
        });
    });
});
