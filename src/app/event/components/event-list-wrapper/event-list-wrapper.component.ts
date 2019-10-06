import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Event } from 'app/models/Event';
import { IEventListState } from 'app/stores/eventlist/eventlist.reducer';
import { IEventListFilter } from '../event-list-filter/event-list-filter.component';
import { GlobalState } from 'app/stores/globalState';
import { ChangeEventListFilter, GetEventListAsyncStart } from 'app/actions/eventlist.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-event-list-wrapper',
    templateUrl: './event-list-wrapper.component.html',
    styleUrls: ['./event-list-wrapper.component.scss']
})
export class EventListWrapperComponent implements OnInit, OnDestroy {

    private sub: Subscription;
    private eventsList: Array<Event> = [];

    public filter: IEventListFilter =  {
        name: '',
        year: ''
    };

    public isLoading: boolean;

    public filteredList: Array<Event> = [];

    constructor(
        private _store: Store<GlobalState>,
        private _activeRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.sub = this._store.select(store => store.eventlistState)
            .subscribe( (evtState: IEventListState) => {
                if (evtState) {
                    this.eventsList = evtState.eventList;
                    this.filter = evtState.eventFilter;
                    this.isLoading = evtState.isLoading;
                    this.filterList();
                    this.updateCurrentRoute();
                }
            });
        this.sub.add(this._activeRoute.queryParams.subscribe(
            (params: IEventListFilter) => {
                if (params) {
                    this.filter = params;
                }
            }
        ));
        this._store.dispatch(new GetEventListAsyncStart());
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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
        this._store.dispatch(new ChangeEventListFilter(filter));
    }

    updateCurrentRoute() {
        this._router.navigate([], {
            queryParams: this.filter,
            relativeTo: this._activeRoute
        });
    }
}
