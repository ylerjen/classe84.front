import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IEventListFilter {
    name?: string;
    year?: number;
}

@Component({
    selector: 'app-event-list-filter',
    templateUrl: './event-list-filter.component.html',
    styleUrls: ['./event-list-filter.component.scss']
})
export class EventListFilterComponent {

    private model: IEventListFilter = {
        name: '',
        year: undefined
    };

    @Input()
    set filter(val: IEventListFilter) {
        this.model.name = val.name || '';
        this.model.year = val.year || undefined;
    }
    get filter(): IEventListFilter {
        return this.model;
    }

    @Output()
    update: EventEmitter<IEventListFilter> = new EventEmitter<IEventListFilter>();
}
