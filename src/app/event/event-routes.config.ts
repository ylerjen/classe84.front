import { Routes } from '@angular/router';

import { AuthService } from 'app/auth/services/auth.service';
import { EventResolverService } from './resolvers/event-resolver.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventFormLayoutComponent } from './layouts/event-form-layout/event-form-layout.component';
import { EventDetailLayoutComponent } from './layouts/event-detail-layout/event-detail-layout.component';
import { EventSubscriptionsViewerComponent } from './components/event-subscriptions-viewer/event-subscriptions-viewer.component';

/**
 * The route definition for the user module
 */
export const eventRoutes: Routes = [
    {
        path: 'events',
        component: EventlistPageComponent,
    },
    {
        path: 'events/add',
        component: EventFormLayoutComponent,
    }, {
        path: 'events/:id',
        component: EventDetailLayoutComponent,
        canActivate: [ AuthService ],
        resolve: {
            currentEvent: EventResolverService,
        },
    }, {
        path: 'events/:id/edit',
        component: EventFormLayoutComponent,
        canActivate: [ AuthService ],
        resolve: {
            dispatcher: EventResolverService,
        }
    }, {
        path: 'events/:id/subscriptions',
        component: EventSubscriptionsViewerComponent,
        canActivate: [ AuthService ],
    }
];