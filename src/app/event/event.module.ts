import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';

import { GMAP_API_KEY } from '../config/settings';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth/auth.service';
import { EventsService } from './services/events.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventPageComponent } from './pages/event/event-page.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListWrapperComponent } from './event-list-wrapper/event-list-wrapper.component';
import { EventListFilterComponent } from './event-list-filter/event-list-filter.component';

const eventRoutes: Routes = [
    { path: 'events', component: EventlistPageComponent },
    { path: 'events/:id', component: EventPageComponent, canActivate: [ AuthService ] }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(eventRoutes),
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: GMAP_API_KEY
          }),
    ],
    declarations: [
        EventlistPageComponent,
        EventPageComponent,
        EventListComponent,
        EventDetailComponent,
        EventListWrapperComponent,
        EventListFilterComponent,
    ],
    providers: [
        EventsService
    ]
})
export class EventModule { }
