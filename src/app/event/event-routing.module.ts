import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventSubscriptionsViewerComponent } from './components/event-subscriptions-viewer/event-subscriptions-viewer.component';
import { EventFormLayoutComponent } from './layouts/event-form-layout/event-form-layout.component';
import { EventDetailLayoutComponent } from './layouts/event-detail-layout/event-detail-layout.component';
import { EventResolverService } from './resolvers/event-resolver.service';
import { eventRouteBuilder } from './event-route-builder';

const eventRoutes: Routes = [
    {
        path: eventRouteBuilder.root(),
        component: EventlistPageComponent
    },
    {
        path: eventRouteBuilder.add(),
        component: EventFormLayoutComponent,
    }, {
        path: eventRouteBuilder.show(':id'),
        component: EventDetailLayoutComponent,
        canActivate: [ AuthService ],
        resolve: {
            currentEvent: EventResolverService
        },
    }, {
        path: eventRouteBuilder.edit(':id'),
        component: EventFormLayoutComponent,
        canActivate: [ AuthService ],
        resolve: {
            dispatcher: EventResolverService,
        }
    }, {
        path: eventRouteBuilder.subscribe(':id'),
        component: EventSubscriptionsViewerComponent,
        canActivate: [ AuthService ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(eventRoutes),
    ],
    providers: [
        EventResolverService,
    ],
    exports: [ RouterModule ]
})
export class EventRoutingModule { }
