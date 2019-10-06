import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-dropdown',
    styleUrls: ['./dropdown.component.scss'],
    templateUrl: './dropdown.component.html',
    host: {
        '(document:click)': 'onClickOutside($event)',
    },
})
export class DropdownComponent implements OnInit {
    @Input()
    public dropdownLabel: string;

    public isOpen = false;

    public compId: string;

    constructor(private ref: ElementRef) {}

    ngOnInit() {
        this.isOpen = false;
        this.compId = UUID.UUID();
    }

    toggleState(evt: Event): void {
        evt.preventDefault();
        this.isOpen = !this.isOpen;
    }

    onClickOutside(event) {
        if (!this.ref.nativeElement.contains(event.target)) { // or some similar check
          this.isOpen = false;
       }
    }
}
