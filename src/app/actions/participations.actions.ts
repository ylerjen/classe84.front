import { Action } from '@ngrx/store';

import { Subscription } from '@models/Subscription';

import { ErrorWithContext } from '@models/ErrorWithContext';

export enum ParticipationActions {
    getParticipationListStart    = '[Participation] get Start',
    getParticipationListFinished = '[Participation] get Finished',
    getParticipationListFailed   = '[Participation] get Failed',
    addParticipation             = '[Participation] add',
    addParticipationFinished     = '[Participation] add Finished',
    addParticipationFailed       = '[Participation] add Failed',
    deleteParticipation          = '[Participation] delete',
    deleteParticipationFinished  = '[Participation] delete Finished',
    deleteParticipationFailed    = '[Participation] delete Failed',
    updateSubscrList             = '[Participation] update list',
    resetParticipationState      = '[Participation] reset state',
}

export class ResetParticipationState implements Action {
    readonly type = ParticipationActions.resetParticipationState;
}

export class AddParticipation implements Action {
    readonly type = ParticipationActions.addParticipation;
    constructor(public payload: Subscription) {}
}

export class AddParticipationFinished implements Action {
    readonly type = ParticipationActions.addParticipationFinished;
    constructor(public payload: Subscription) {}
}

export class AddParticipationFailed implements Action {
    readonly type = ParticipationActions.addParticipationFailed;
    constructor(public payload: ErrorWithContext<Subscription>) {}
}

export class UpdateParticipation implements Action {
    readonly type = ParticipationActions.updateSubscrList;
    constructor(public payload: Subscription) {}
}

export class DeleteParticipation implements Action {
    readonly type = ParticipationActions.deleteParticipation;
    constructor(public payload: Subscription) {}
}

export class DeleteParticipationFinished implements Action {
    readonly type = ParticipationActions.deleteParticipationFinished;
    constructor(public payload: Subscription) {}
}

export class DeleteParticipationFailed implements Action {
    readonly type = ParticipationActions.deleteParticipationFailed;
    constructor(public payload: Error) {}
}

/**
 * Fetch the list of participation to an event for a given user
 * @param {string} payload - is the id of the user
 * @property {string} type - is the type of the action class
 */
export class GetParticipationListStart implements Action {
    readonly type = ParticipationActions.getParticipationListStart;
    constructor(public payload: string) {}
}

export class GetParticipationListFinished implements Action {
    readonly type = ParticipationActions.getParticipationListFinished;
    constructor(public payload: Array<Subscription>) {}
}

export class GetParticipationListFailed implements Action {
    readonly type = ParticipationActions.getParticipationListFailed;
    constructor(public payload: Error) {}
}
