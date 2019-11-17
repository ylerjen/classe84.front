import { eventlistReducer, initialState, IEventListState } from './eventlist.reducer';
import { Event as EventModel} from '../../../models/Event';
import {
    EventlistActionTypes, GetEventListAsyncStart, GetEventListAsyncFinished, AddEventInlist, DeleteEventFromList, EmptyEventList
} from '../actions/eventlist.actions';

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
            eventFilter: { name: '', year: ''},
            eventList: [ new EventModel({id: 1, title: 'Souper 34', organisator: 'Chuck'}) ]
        };

        const result = eventlistReducer(currentState, action);
        expect(result.isLoading).toEqual(currentState.isLoading);
        expect(result.eventFilter).toEqual(currentState.eventFilter);
        expect(result.eventList).toEqual(currentState.eventList);
    });

    describe(`#${EventlistActionTypes.getEventlistAsyncStart}`, () => {
        const action = GetEventListAsyncStart;

        it('should set the loading state to true', () => {
            const result = eventlistReducer(initialState, new action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${EventlistActionTypes.getEventlistAsyncFinished}`, () => {
        const action = GetEventListAsyncFinished;
        const payload = [ new EventModel({id: 1, title: 'Souper 2345', organisator: 'Grylls' }) ];

        it('should set the loading state to false', () => {
            const result = eventlistReducer(initialState, new action(payload));

            expect(result.isLoading).toBeFalsy();
        });

        it('should set passed eventlist as the new event list state', () => {
            const result = eventlistReducer(initialState, new action(payload));

            expect(result.eventList.length).toBe(payload.length);
        });
    });

    describe(`#${EventlistActionTypes.addEventInList}`, () => {
        const action = AddEventInlist;
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: { name: '', year: ''},
            eventList: [ new EventModel({id: 1, title: 'Souper 2345', organisator: 'Grylls' }) ]
        };
        const payload = new EventModel({id: 2, title: 'Voyage 2345', organisator: 'Grylls' });

        it('should add the new event to the current event list', () => {
            const result = eventlistReducer(currentState, new action(payload));

            expect(result.eventList.length).toBe(2);
            expect(result.eventList.find(event => event.id === 1)).toBeTruthy();
            expect(result.eventList.find(event => event.id === payload.id)).toBeTruthy();
        });
    });

    describe(`#${EventlistActionTypes.deleteEventFromList}`, () => {
        const action = DeleteEventFromList;
        const payload = new EventModel({id: 2, title: 'Voyage 2345', organisator: 'Grylls' });
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: { name: '', year: ''},
            eventList: [
                new EventModel({id: 1, title: 'Souper 2345', organisator: 'Chuck' }),
                payload
            ]
        };

        it('should delete the passed event from the current event list', () => {
            const result = eventlistReducer(currentState, new action(payload));

            expect(result.eventList.length).toBe(1);
            expect(result.eventList.find(event => event.id === 1)).toBeTruthy();
            expect(result.eventList.find(event => event.id === payload.id)).toBeFalsy();
        });
    });


    describe(`#${EventlistActionTypes.resetEventlistState}`, () => {
        const action = EmptyEventList;
        const currentState: IEventListState = {
            isLoading: false,
            eventFilter: { name: '', year: ''},
            eventList: [
                new EventModel({id: 1, title: 'Souper 2345', organisator: 'Chuck' }),
                new EventModel({id: 2, title: 'Voyage 2345', organisator: 'Grylls' })
            ]
        };

        it('should empty the event list state', () => {
            const result = eventlistReducer(currentState, new action());

            expect(result.eventList.length).toBe(0);
        });
    });
});
