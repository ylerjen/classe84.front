import { subscriptionsReducer, initialState, ISubscriptionState } from './subscription.reducer';
import { Subscription } from '@models/Subscription';
import {
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getSubscriptionAsyncStart,
    getSubscriptionAsyncFinished,
    resetSubscriptionState,
    ASYNC_SUBSCRIPTION_LIST_START,
    ASYNC_SUBSCRIPTION_LIST_FINISHED,
    ADD_SUBSCRIPTION_TO_EVENT,
    UPDATE_SUBSCRIPTION_STATE,
    DELETE_SUBSCRIPTION_FROM_EVENT,
    RESET_SUBSCRIPTION_STATE
} from 'app/actions/subscription.actions';

describe('subscriptionsReducer state', () => {

    it('should return the default state on init', () => {
        const action = {} as any;

        const result = subscriptionsReducer(undefined, action);
        expect(result).toEqual(initialState);
    });

    it('should keep the same state if action is not existant', () => {
        const action = { type: 'not registered action' } as any;
        const currentState: ISubscriptionState = {
            isLoading: false,
            subscriptionList: [ new Subscription({user_id: 1, event_id: 1 }) ],
            dataDate: new Date()
        };

        const result = subscriptionsReducer(currentState, action);
        expect(result.isLoading).toEqual(currentState.isLoading);
        expect(result.subscriptionList).toEqual(currentState.subscriptionList);
    });

    describe(`#${ASYNC_SUBSCRIPTION_LIST_START}`, () => {
        const action = getSubscriptionAsyncStart;

        it('should set the loading state to true', () => {
            const result = subscriptionsReducer(initialState, action());

            expect(result.isLoading).toBeTruthy();
        });
    });

    describe(`#${ASYNC_SUBSCRIPTION_LIST_FINISHED}`, () => {
        const action = getSubscriptionAsyncFinished;
        const payload = [ new Subscription({user_id: 1, event_id: 1 }) ];

        it('should set the loading state to false', () => {
            const result = subscriptionsReducer(initialState, action(payload));

            expect(result.isLoading).toBeFalsy();
        });

        it('should set passed subscription list as the new subscription list state', () => {
            const result = subscriptionsReducer(initialState, action(payload));

            expect(result.subscriptionList.length).toBe(payload.length);
        });

        it('should set the dataDate to a current timestamp', () => {
            const refDate = new Date();
            const result = subscriptionsReducer(initialState, action(payload));

            expect(result.dataDate.getDate()).toBe(refDate.getDate());
            expect(result.dataDate.getDay()).toBe(refDate.getDay());
            expect(result.dataDate.getMonth()).toBe(refDate.getMonth());
            expect(result.dataDate.getFullYear()).toBe(refDate.getFullYear());
        });
    });

    describe(`#${ADD_SUBSCRIPTION_TO_EVENT}`, () => {
        const action = addSubscription;
        const currentState: ISubscriptionState = {
            isLoading: false,
            subscriptionList: [ new Subscription({user_id: 1, event_id: 1 }) ],
            dataDate: new Date()
        };
        const payload = new Subscription({user_id: 2, event_id: 2 });

        it('should add the new subscription to the current subscription list', () => {
            const result = subscriptionsReducer(currentState, action(payload));

            expect(result.subscriptionList.length).toBe(2);
            expect(result.subscriptionList.find(subscr => subscr.event_id === 1)).toBeTruthy();
            expect(result.subscriptionList.find(subscr => subscr.event_id === payload.event_id)).toBeTruthy();
        });
    });

    describe(`#${UPDATE_SUBSCRIPTION_STATE}`, () => {
        const action = updateSubscription;
        const currentState: ISubscriptionState = {
            isLoading: false,
            subscriptionList: [
                new Subscription({user_id: 1, event_id: 1, isStorePending: false }),
                new Subscription({user_id: 2, event_id: 2, isStorePending: false }) ],
            dataDate: new Date()
        };
        const payload = new Subscription({user_id: 2, event_id: 2, isStorePending: true });

        it('should update the existing subscription in the list', () => {
            const result = subscriptionsReducer(currentState, action(payload));

            expect(result.subscriptionList.length).toBe(2);
            expect(result.subscriptionList.find(
                subscr => subscr.event_id === 1
            ).isStorePending).toBeFalsy();
            expect(result.subscriptionList.find(
                subscr => subscr.event_id === 2
            ).isStorePending).toBe(payload.isStorePending);
        });
    });

    describe(`#${DELETE_SUBSCRIPTION_FROM_EVENT}`, () => {
        const action = deleteSubscription;
        const payload = new Subscription({user_id: 2, event_id: 2 });
        const currentState: ISubscriptionState = {
            isLoading: false,
            subscriptionList: [
                new Subscription({user_id: 1, event_id: 1 }),
                payload
            ],
            dataDate: new Date()
        };

        it('should delete the passed subscription from the current subscription list', () => {
            const result = subscriptionsReducer(currentState, action(payload));

            expect(result.subscriptionList.length).toBe(1);
            expect(result.subscriptionList.find(subscr => subscr.event_id === 1)).toBeTruthy();
            expect(result.subscriptionList.find(subscr => subscr.event_id === payload.event_id)).toBeFalsy();
        });
    });


    describe(`#${RESET_SUBSCRIPTION_STATE}`, () => {
        const action = resetSubscriptionState;
        const currentState: ISubscriptionState = {
            isLoading: false,
            subscriptionList: [
                new Subscription({user_id: 1, event_id: 1 }),
                new Subscription({user_id: 2, event_id: 2 }),
            ],
            dataDate: new Date()
        };

        it('should empty the subscription list state', () => {
            const result = subscriptionsReducer(currentState, action());

            expect(result.subscriptionList.length).toBe(0);
        });
    });
});
