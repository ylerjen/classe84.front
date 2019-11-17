export const eventRouteBuilder = {
    root: () => 'events',
    add: () => 'events/add',
    show: id => `events/${id}`,
    edit: id => `events/${id}/edit`,
    subscribe: id => `events/${id}/subscriptions`,
};
