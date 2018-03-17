import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Event } from 'app/models/Event';
import { IEventListState } from 'app/stores/eventlist/eventlist.reducer';
import { IEventListFilter } from '../event-list-filter/event-list-filter.component';
import { EventsService } from '../../services/events.service';
import { NotificationService } from 'app/services/notification/notification.service';
import { IGlobalState } from 'app/stores/globalState';

@Component({
    selector: 'app-event-list-wrapper',
    templateUrl: './event-list-wrapper.component.html',
    styleUrls: ['./event-list-wrapper.component.scss']
})
export class EventListWrapperComponent implements OnInit {

    public filter: IEventListFilter =  {
        name: '',
        year: 0
    };
    public isLoading: boolean;

    private eventsList: Array<Event> = [];

    public filteredList: Array<Event> = [];

    constructor(
        private _eventsService: EventsService,
        private _store: Store<IGlobalState>,
        private _notifSrvc: NotificationService,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._store.select('eventlistState')
            .subscribe( (evtState: IEventListState) => {
                console.log('eventlistState goooooo')
                if (evtState) {
                    this.eventsList = evtState.eventList;
                    this.filterList();
                    this.isLoading = evtState.isLoading;
                }
            });
        this.loadAll();
        this._activeRoute.queryParams.subscribe(
            (params: IEventListFilter) => {
                if (params) {
                    this.filter = params;
                }
            }
        );
    }

    filterList() {
        this.filteredList = this.eventsList.filter(event => {
            const nameFilter = (this.filter.name) ? this.filter.name.toLowerCase() : '';
            const checkNameSearch = event.title.toLowerCase().includes(nameFilter);
            return checkNameSearch;
        });
    }

    loadAll() {
        this._eventsService.fetchAll()
            .catch( (error: Response) => {
                let msg;
                if (error.status === 0) {
                    msg = 'API unreachable. Please contact the administrator.';
                } else {
                    msg = error.body || error.statusText;
                }
                this._notifSrvc.notifyError(msg);
                return Observable.throw(error.body);
            })
            .subscribe(action => this._store.dispatch(action));
    }

    onFilterChange(filter: IEventListFilter) {
        this.filter = filter;
        this.filterList();
        this.updateCurrentRoute();
    }

    updateCurrentRoute() {
        this._router.navigate([], {
            queryParams: this.filter,
            relativeTo: this._activeRoute
        });
    }
}
