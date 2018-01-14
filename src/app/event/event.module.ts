import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { NgxEditorModule } from 'ngx-editor';

import { GMAP_API_KEY } from '../config/settings';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../services/auth/auth.service';
import { EventsService } from './services/events.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventPageComponent } from './pages/event/event-page.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListWrapperComponent } from './components/event-list-wrapper/event-list-wrapper.component';
import { EventListFilterComponent } from './components/event-list-filter/event-list-filter.component';
import { EventDetailViewerComponent } from './components/event-detail-viewer/event-detail-viewer.component';
import { EventFormViewerComponent } from './components/event-form-viewer/event-form-viewer.component';
import { EventFormComponent } from './event-form/event-form.component';
import { GeoresultFormComponent } from './components/georesult-form/georesult-form.component';

const eventRoutes: Routes = [
    { path: 'events', component: EventlistPageComponent },
    {
        path: 'events/:id',
        component: EventPageComponent,
        canActivate: [ AuthService ],
        children: [
            { path: '', component: EventDetailViewerComponent },
            { path: 'edit', component: EventFormViewerComponent },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(eventRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
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
        EventDetailViewerComponent,
        EventFormViewerComponent,
        EventFormComponent,
        GeoresultFormComponent,
    ],
    providers: [
        EventsService
    ]
})
export class EventModule { }
