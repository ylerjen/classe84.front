import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { EventsService } from './services/events.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventPageComponent } from './pages/event/event-page.component';
import { EventListComponent } from './event-list/event-list.component';

const eventRoutes: Routes = [
    { path: 'events', component: EventlistPageComponent},
    // {
    //     path: ROUTE_URL.eventById,
    //     component: EventPageComponent,
    //     canActivate: [ AuthService ],
    //     children: [
    //         {
    //             path: ROUTE_URL.default,
    //             pathMatch: 'full',
    //             component: UserDetailViewerComponent,
    //             children: [
    //                 { path: ROUTE_URL.address, component: LoginPage },
    //                 { path: ROUTE_URL.contact, component: AboutPage },
    //             ]
    //         },
    //         { path: ROUTE_URL.edit, component: UserFormViewerComponent },
    //     ]
    // },
    // {
    //     path: ROUTE_URL.events,
    //     component: EventlistPageComponent
    // },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(eventRoutes),
    ],
    declarations: [
        EventlistPageComponent,
        EventPageComponent,
        EventListComponent,
    ],
    providers: [
        EventsService
    ]
})
export class EventModule { }
