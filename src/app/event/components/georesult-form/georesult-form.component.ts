import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-georesult-form',
    templateUrl: './georesult-form.component.html',
    styleUrls: ['./georesult-form.component.scss']
})
export class GeoresultFormComponent implements OnInit {

    @Input() public georesults: Array<Object>;

    @Output() public onResultSelection = new EventEmitter<string>();

    ngOnInit() {
    }

    resultSelected(jsonStr: string) {
        this.onResultSelection.emit(jsonStr);
    }
}
