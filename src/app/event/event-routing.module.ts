import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from 'app/auth/services/auth.service';
import { EventResolverService } from './resolvers/event-resolver.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventFormLayoutComponent } from './layouts/event-form-layout/event-form-layout.component';
import { EventDetailLayoutComponent } from './layouts/event-detail-layout/event-detail-layout.component';
import { EventSubscriptionsViewerComponent } from './components/event-subscriptions-viewer/event-subscriptions-viewer.component';
import { routeBuilder, ROUTE_SEGMENT } from 'app/config/router.config';

/**
 * The route definition for the user module
 */
export const eventRoutes: Routes = [
    {
        path: ROUTE_SEGMENT.events,
        children: [
            {
                path: ROUTE_SEGMENT.default,
                component: EventlistPageComponent,
            }, {
                path: ROUTE_SEGMENT.add,
                component: EventFormLayoutComponent,
            }, {
                path: ROUTE_SEGMENT.byId,
                component: EventDetailLayoutComponent,
                canActivate: [AuthService],
                resolve: {
                    currentEvent: EventResolverService,
                },
            }, {
                path: routeBuilder.editById(),
                component: EventFormLayoutComponent,
                canActivate: [AuthService],
                resolve: {
                    dispatcher: EventResolverService,
                }
            }, {
                path: routeBuilder.subscriptionsForId(),
                component: EventSubscriptionsViewerComponent,
                canActivate: [AuthService],
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(eventRoutes) ],
    exports: [ RouterModule ],
})
export class EventRoutingModule { }
