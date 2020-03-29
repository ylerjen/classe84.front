import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { EventState, eventReducer } from './reducers/event/event.reducer';
import { IEventListState, eventlistReducer } from './reducers/eventlist/eventlist.reducer';

export const eventModuleFeatureKey = 'eventModule';

export interface EventModuleState {
    eventState: EventState;
    eventlistState: IEventListState;
}

export const eventModuleReducers: ActionReducerMap<EventModuleState> = {
    eventState: eventReducer,
    eventlistState: eventlistReducer,
};

export const selectEventModuleState = createFeatureSelector<EventModuleState>(eventModuleFeatureKey);
