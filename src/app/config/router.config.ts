/**
 * Route segment used to construct urls
 */
export const ROUTE_SEGMENT = {
    default: '',
    byId: ':id',
    add: 'add',
    edit: 'edit',
    about: 'about',
    login: 'login',
    logout: 'logout',
    events: 'events',
    users: 'users',
    addresses: 'addresses',
    subscriptions: 'subscriptions',
    contact: 'contact',
    restorePassword: 'restore-password',
    changePassword: 'change-password',
    unauthorized: 'unauthorized',
    forbidden: 'forbidden',
};

export const routeBuilder = {
    subscriptionsForId: () => `${ROUTE_SEGMENT.byId}/${ROUTE_SEGMENT.subscriptions}`,
    editById: () => `${ROUTE_SEGMENT.byId}/${ROUTE_SEGMENT.edit}`,
    userlist: () => ROUTE_SEGMENT.users,
    user: (id: string) => `${ROUTE_SEGMENT.users}/${id}`,
    userEdit: (id: string) => `${ROUTE_SEGMENT.users}/${id}/${ROUTE_SEGMENT.edit}`,
    addressEdit: (id: string) => `${ROUTE_SEGMENT.addresses}/${id}/${ROUTE_SEGMENT.edit}`,
    eventlist: () => ROUTE_SEGMENT.events,
    event: (id: string) => `${ROUTE_SEGMENT.events}/${id}`,
    eventEdit: (id: string) => `${ROUTE_SEGMENT.events}/${id}/${ROUTE_SEGMENT.edit}`,
    eventsSubscriptions: (id: string) => `${ROUTE_SEGMENT.events}/${id}/${ROUTE_SEGMENT.subscriptions}`,
};
