import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-list-filter',
  templateUrl: './event-list-filter.component.html',
  styleUrls: ['./event-list-filter.component.scss']
})
export class EventListFilterComponent {

  @Input()
  filter;

}
