import { Action } from '@ngrx/store';

import { EventlistActions } from 'app/actions/eventlist.actions';
import { Event } from 'app/models/Event';
import { ActionWithPayload } from 'app/actions/app.actions';
import { IEventListFilter } from '../../event/components/event-list-filter/event-list-filter.component';

export interface IEventListState {
    eventList: Event[];
    isLoading: boolean;
    eventFilter: IEventListFilter;
}

export const initialState: IEventListState = {
    eventList: [],
    isLoading: false,
    eventFilter: { name: '', year: '' }
};

export function eventlistReducer(state: IEventListState = initialState, action: Action): IEventListState {
    switch (action.type) {
        case EventlistActions.getEventlistAsyncStart:
            return Object.assign({}, state, {
                isLoading: true
            });

        case EventlistActions.getEventlistAsyncFinished:
        {
            const act = action as ActionWithPayload<Array<Event>>;
            return Object.assign({}, state, {
                isLoading: false,
                eventList: act.payload.slice()
            });
        }

        case EventlistActions.addEventInList:
        {
            const act = action as ActionWithPayload<Event>;
            return Object.assign({}, state, {
                isLoading: false,
                eventList: [
                    ...state.eventList,
                    act.payload
                ]
            });
        }

        case EventlistActions.deleteEventFromList:
        {
            const act = action as ActionWithPayload<Event>;
            return Object.assign({}, state, {
                isLoading: false,
                eventList: state.eventList.filter(event => event.id !== act.payload.id)
            });
        }

        case EventlistActions.resetEventlistState:
            return Object.assign({}, state, {
                isLoading: false,
                eventList: []
            });

        case EventlistActions.changeFilter:
        {
            const act = action as ActionWithPayload<IEventListFilter>;
            return Object.assign({}, state, {
                eventFilter: act.payload
            });
        }

        default:
            return state;
    }
}
