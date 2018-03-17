import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Event } from 'app/models/Event';
import { IEventListState } from 'app/stores/eventlist/eventlist.reducer';
import { IEventListFilter } from '../event-list-filter/event-list-filter.component';
import { IGlobalState } from 'app/stores/globalState';
import { changeEventListFilter, getEventListAsyncStart } from 'app/actions/eventlist.actions';

@Component({
    selector: 'app-event-list-wrapper',
    templateUrl: './event-list-wrapper.component.html',
    styleUrls: ['./event-list-wrapper.component.scss']
})
export class EventListWrapperComponent implements OnInit {

    public filter: IEventListFilter =  {
        name: '',
        year: ''
    };

    public isLoading: boolean;

    private eventsList: Array<Event> = [];

    public filteredList: Array<Event> = [];

    constructor(
        private _store: Store<IGlobalState>,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._store.select('eventlistState')
            .subscribe( (evtState: IEventListState) => {
                if (evtState) {
                    this.eventsList = evtState.eventList;
                    this.filter = evtState.eventFilter;
                    this.isLoading = evtState.isLoading;
                    this.filterList();
                    this.updateCurrentRoute();
                }
            });
        this._activeRoute.queryParams.subscribe(
            (params: IEventListFilter) => {
                if (params) {
                    this.filter = params;
                }
            }
        );
        this._store.dispatch(getEventListAsyncStart());
    }

    filterList() {
        this.filteredList = this.eventsList.filter(event => {
            const nameFilter = (this.filter.name) ? this.filter.name.toLowerCase() : '';
            const checkNameSearch = event.title.toLowerCase().includes(nameFilter);
            return checkNameSearch;
        });
    }

    onFilterChange(filter: IEventListFilter) {
        console.log(filter);
        this._store.dispatch(changeEventListFilter(filter));
    }

    updateCurrentRoute() {
        this._router.navigate([], {
            queryParams: this.filter,
            relativeTo: this._activeRoute
        });
    }
}
