import { Component, OnInit, Input } from '@angular/core';

import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-dropdown',
    styleUrls: ['./dropdown.component.scss'],
    template: `
    <div class="dropdown" [class.show]="isOpen">
        <a href="#" (click)="toggleState($event)" class="dropdown-toggle" type="button" id="dropdownMenuButton-{{compId}}" data-toggle="dropdown" aria-haspopup="true" [attr.aria-expanded]="isOpen">
            <ng-content select="[label]"></ng-content>
        </a>
        <div class="dropdown-menu" [class.show]="isOpen" [attr.aria-labelledby]="'dropdownMenuButton-'+compId">
            <ng-content select="[content]"></ng-content>
        </div>
    </div>`,
})
export class DropdownComponent implements OnInit {

    @Input() public dropdownLabel: string;

    public isOpen = false;

    public compId: string;

    ngOnInit() {
        this.isOpen = false;
        this.compId = UUID.UUID();
    }

    toggleState(evt: Event): void {
        evt.preventDefault();
        this.isOpen = !this.isOpen;
    }
}
