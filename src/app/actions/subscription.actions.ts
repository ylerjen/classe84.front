import { Action } from '@ngrx/store';

import { Subscription } from '../models/Subscription';
import { ErrorWithContext } from '@models/ErrorWithContext';

export enum SubscriptionActionTypes {
    getSubscriptionListStart    = '[Subscription] get Start',
    getSubscriptionListFinished = '[Subscription] get Finished',
    getSubscriptionListFailed   = '[Subscription] get Failed',
    addSubscription             = '[Subscription] add',
    addSubscriptionFinished     = '[Subscription] add Finished',
    addSubscriptionFailed       = '[Subscription] add Failed',
    deleteSubscription          = '[Subscription] delete',
    deleteSubscriptionFinished  = '[Subscription] delete Finished',
    deleteSubscriptionFailed    = '[Subscription] delete Failed',
    updateSubscrList            = '[Subscription] update list',
    resetSubscriptionState      = '[Subscription] reset state',
}

export class ResetSubscriptionState implements Action {
    readonly type = SubscriptionActionTypes.resetSubscriptionState;
}

export class AddSubscription implements Action {
    readonly type = SubscriptionActionTypes.addSubscription;
    constructor(public payload: Subscription) {}
}

export class AddSubscriptionFinished implements Action {
    readonly type = SubscriptionActionTypes.addSubscriptionFinished;
    constructor(public payload: Subscription) {}
}

export class AddSubscriptionFailed implements Action {
    readonly type = SubscriptionActionTypes.addSubscriptionFailed;
    constructor(public payload: ErrorWithContext<Subscription>) {}
}

export class UpdateSubscription implements Action {
    readonly type = SubscriptionActionTypes.updateSubscrList;
    constructor(public payload: Subscription) {}
}

export class DeleteSubscription implements Action {
    readonly type = SubscriptionActionTypes.deleteSubscription;
    constructor(public payload: Subscription) {}
}

export class DeleteSubscriptionFinished implements Action {
    readonly type = SubscriptionActionTypes.deleteSubscriptionFinished;
    constructor(public payload: Subscription) {}
}

export class DeleteSubscriptionFailed implements Action {
    readonly type = SubscriptionActionTypes.deleteSubscriptionFailed;
    constructor(public payload: ErrorWithContext<Subscription>) {}
}

export class GetSubscriptionStart implements Action {
    readonly type = SubscriptionActionTypes.getSubscriptionListStart;
    constructor(public payload: string) {}
}

export class GetSubscriptionFinished implements Action {
    readonly type = SubscriptionActionTypes.getSubscriptionListFinished;
    constructor(public payload: Array<Subscription>) {}
}

export class GetSubscriptionFailed implements Action {
    readonly type = SubscriptionActionTypes.getSubscriptionListFailed;
    constructor(public payload: Error) {}
}

export type SubscriptionActions = ResetSubscriptionState
    | AddSubscription
    | AddSubscriptionFinished
    | AddSubscriptionFailed
    | UpdateSubscription
    | DeleteSubscription
    | DeleteSubscriptionFinished
    | DeleteSubscriptionFailed
    | GetSubscriptionStart
    | GetSubscriptionFinished
    | GetSubscriptionFailed;
