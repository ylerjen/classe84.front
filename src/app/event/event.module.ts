import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxEditorModule } from 'ngx-editor';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

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
import { EventFormComponent } from './components/event-form/event-form.component';
import { GeoresultFormComponent } from './components/georesult-form/georesult-form.component';
import { EventSubscriptionsComponent } from './components/event-subscriptions/event-subscriptions.component';
import { EventSubscriptionsViewerComponent } from './components/event-subscriptions-viewer/event-subscriptions-viewer.component';
import { EventControlsComponent } from './components/event-controls/event-controls.component';
import { EventFormLayoutComponent } from './layouts/event-form-layout/event-form-layout.component';
import { EventDetailLayoutComponent } from './layouts/event-detail-layout/event-detail-layout.component';
import { EventResolverService } from './resolvers/event-resolver.service';
import { EventEffects } from 'app/event/states/effects/event.effect';
import { EventlistEffects } from 'app/event/states/effects/eventlist.effect';
import { eventModuleFeatureKey, eventModuleReducers } from './states/event.state';

const eventRoutes: Routes = [
    {
        path: 'events',
        component: EventlistPageComponent
    },
    {
        path: 'events/add',
        component: EventFormLayoutComponent,
    }, {
        path: 'events/:id',
        component: EventDetailLayoutComponent,
        canActivate: [ AuthService ],
        resolve: {
            currentEvent: EventResolverService
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

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(eventRoutes),
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(eventModuleFeatureKey, eventModuleReducers),
        EffectsModule.forFeature([
            EventlistEffects,
            EventEffects,
        ]),
        NgxEditorModule,
        TypeaheadModule.forRoot(),
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
        EventsService,
        EventResolverService,
    ]
})
export class EventModule { }
