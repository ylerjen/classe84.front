import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IEventListFilter {
    name: string;
    activeOnly: boolean;
}

@Component({
    selector: 'app-event-list-filter',
    templateUrl: './event-list-filter.component.html',
    styleUrls: ['./event-list-filter.component.scss']
})
export class EventListFilterComponent {

    private model: IEventListFilter = {
        name: '',
        activeOnly: false
    };

    @Input()
    set filter(val: IEventListFilter) {
        this.model.name = val.name;
        this.model.activeOnly = val.activeOnly;
    };
    get filter(): IEventListFilter {
        return this.model;
    }

    @Output()
    update: EventEmitter<IEventListFilter> = new EventEmitter<IEventListFilter>();

}
