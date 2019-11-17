import { Event } from 'app/models/Event';
import { ChangeEventListFilter } from 'app/event/state/actions/eventlist.actions';
import { IEventListFilter } from '../../components/event-list-filter/event-list-filter.component';
import { EventlistActionTypes,
    EventlistActions,
    GetEventListAsyncFinished,
    AddEventInlist,
    DeleteEventFromList } from 'app/event/state/actions/eventlist.actions';

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

export function eventlistReducer(state: IEventListState = initialState, action: EventlistActions): IEventListState {
    switch (action.type) {
        case EventlistActionTypes.getEventlistAsyncStart:
            return {
                ...state,
                isLoading: true
            };

        case EventlistActionTypes.getEventlistAsyncFinished:
        {
            const act = action as GetEventListAsyncFinished;
            return {
                ...state,
                isLoading: false,
                eventList: act.payload.slice()
            };
        }

        case EventlistActionTypes.addEventInList:
        {
            const act = action as AddEventInlist;
            return {
                ...state,
                isLoading: false,
                eventList: [
                    ...state.eventList,
                    act.payload
                ]
            };
        }

        case EventlistActionTypes.deleteEventFromList:
        {
            const act = action as DeleteEventFromList;
            return {
                ...state,
                isLoading: false,
                eventList: state.eventList.filter(event => event.id !== act.payload.id)
            };
        }

        case EventlistActionTypes.resetEventlistState:
        {
            return {
                ...state,
                isLoading: false,
                eventList: []
            };
        }

        case EventlistActionTypes.changeFilter:
        {
            const act = action as ChangeEventListFilter;
            return {
                ...state,
                eventFilter: act.payload
            };
        }

        default:
            return state;
    }
}
