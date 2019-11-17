import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-item-controls',
    templateUrl: './item-controls.component.html',
    styleUrls: ['./item-controls.component.scss']
})
export class ItemControlsComponent {

    @Input()
    public editUrl: string;

    @Output()
    public delete = new EventEmitter();

    deleteItem(evt: Event) {
        evt.preventDefault();
        this.delete.emit();
    }
}
