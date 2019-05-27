import { Action } from '@ngrx/store';

import { Subscription } from '../models/Subscription';
import { ActionWithPayload } from './app.actions';
import { ErrorWithContext } from '@models/ErrorWithContext';

export enum SubscriptionActions {
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
    readonly type = SubscriptionActions.resetSubscriptionState;
}

export class AddSubscription implements Action {
    readonly type = SubscriptionActions.addSubscription;
    constructor(public payload: Subscription) {}
}

export class AddSubscriptionFinished implements Action {
    readonly type = SubscriptionActions.addSubscriptionFinished;
    constructor(public payload: Subscription) {}
}

export class AddSubscriptionFailed implements Action {
    readonly type = SubscriptionActions.addSubscriptionFailed;
    constructor(public payload: ErrorWithContext<Subscription>) {}
}

export class UpdateSubscription implements Action {
    readonly type = SubscriptionActions.updateSubscrList;
    constructor(public payload: Subscription) {}
}

export class DeleteSubscription implements Action {
    readonly type = SubscriptionActions.deleteSubscription;
    constructor(public payload: Subscription) {}
}

export class DeleteSubscriptionFinished implements Action {
    readonly type = SubscriptionActions.deleteSubscriptionFinished;
    constructor(public payload: Subscription) {}
}

export class DeleteSubscriptionFailed implements Action {
    readonly type = SubscriptionActions.deleteSubscriptionFailed;
    constructor(public payload: Error) {}
}

export class GetSubscriptionStart implements Action {
    readonly type = SubscriptionActions.getSubscriptionListStart;
    constructor(public payload: string) {}
}

export class GetSubscriptionFinished implements Action {
    readonly type = SubscriptionActions.getSubscriptionListFinished;
    constructor(public payload: Array<Subscription>) {}
}

export class GetSubscriptionFailed implements Action {
    readonly type = SubscriptionActions.getSubscriptionListFailed;
    constructor(public payload: Error) {}
}
