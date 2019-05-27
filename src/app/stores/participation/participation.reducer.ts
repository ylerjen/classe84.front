import { Action } from '@ngrx/store';
import { Subscription } from '@models/Subscription';
import { ParticipationActions, GetParticipationListStart, GetParticipationListFinished } from '@actions/participations.actions';

export interface IParticipationState {
    participationList: Array<Subscription>;
    userId: string;
    isLoading: boolean;
    dataDate: Date;
}

export const initialState: IParticipationState = {
    participationList: [],
    userId: '',
    isLoading: false,
    dataDate: undefined
};

export function participationsReducer(state: IParticipationState = initialState, action?: Action): IParticipationState {
    switch (action.type) {
        case ParticipationActions.getParticipationListStart:
        {
            const act = action as GetParticipationListStart;
            return {
                ...state,
                userId: act.payload,
                isLoading: true,
                dataDate: new Date()
            };
        }
        case ParticipationActions.getParticipationListFinished:
        {
            const act = action as GetParticipationListFinished;
            return {
                ...state,
                isLoading: false,
                participationList: act.payload,
            }
        }
        default:
            return state;
    }
}
