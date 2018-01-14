import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UUID } from 'angular2-uuid';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    public static bgOverlay: Element;

    @Input() isDisplayed: boolean;

    @Input() public btnSubmitLabel = 'Submit';

    @Output() public onSubmitModal = new EventEmitter<Object>();
    
    @Output() public onCloseModal = new EventEmitter<Object>();

    public compId: string;

    ngOnInit() {
        this.compId = UUID.UUID();
    }
    
    submit(evt: Event): void {
        evt.preventDefault();
        this.onSubmitModal.emit(evt);
    }
    
    close(evt: Event): void {
        evt.preventDefault();
        this.isDisplayed = false;
        this.onCloseModal.emit(evt);
    }
}
