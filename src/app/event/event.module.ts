import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgxEditorModule } from 'ngx-editor';
import { Ng2CompleterModule } from 'ng2-completer';

import { GMAP_API_KEY } from '../config/settings';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/services/auth.service';
import { EventsService } from './services/events.service';
import { EventlistPageComponent } from './pages/eventlist/eventlist-page.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventListWrapperComponent } from './components/event-list-wrapper/event-list-wrapper.component';
import { EventListFilterComponent } from './components/event-list-filter/event-list-filter.component';
import { EventDetailViewerComponent } from './components/event-detail-viewer/event-detail-viewer.component';
import { EventFormViewerComponent } from './components/event-form-viewer/event-form-viewer.component';
import { EventFormComponent } from './event-form/event-form.component';
import { GeoresultFormComponent } from './components/georesult-form/georesult-form.component';
import { EventSubscriptionsComponent } from './components/event-subscriptions/event-subscriptions.component';
import { EventSubscriptionsViewerComponent } from './components/event-subscriptions-viewer/event-subscriptions-viewer.component';
import { EventControlsComponent } from './components/event-controls/event-controls.component';
import { EventFormLayoutComponent } from './layouts/event-form-layout/event-form-layout.component';
import { EventDetailLayoutComponent } from './layouts/event-detail-layout/event-detail-layout.component';

const eventRoutes: Routes = [
    { path: 'events', component: EventlistPageComponent },
    { path: 'events/:id', component: EventDetailLayoutComponent, canActivate: [ AuthService ] },
    { path: 'events/:id/edit', component: EventFormLayoutComponent, canActivate: [ AuthService ] },
    {
        path: 'events/:id/subscriptions',
        component: EventSubscriptionsViewerComponent,
        canActivate: [ AuthService ],
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(eventRoutes),
        Ng2CompleterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEditorModule,
        AgmCoreModule.forRoot({
            apiKey: GMAP_API_KEY
        }),
    ],
    declarations: [
        EventlistPageComponent,
        EventControlsComponent,
        EventListComponent,
        EventDetailComponent,
        EventListWrapperComponent,
        EventListFilterComponent,
        EventDetailViewerComponent,
        EventFormViewerComponent,
        EventFormComponent,
        GeoresultFormComponent,
        EventSubscriptionsComponent,
        EventSubscriptionsViewerComponent,
        EventFormLayoutComponent,
        EventDetailLayoutComponent,
    ],
    providers: [
        EventsService
    ]
})
export class EventModule { }
