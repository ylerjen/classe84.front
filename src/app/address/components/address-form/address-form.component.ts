import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Address } from '@models/Address';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @Input()
    public address: Address;

    @Output()
    public cancelEmitter = new EventEmitter();

    @Output()
    public saveEmitter = new EventEmitter<Address>();

    public addressForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        if (!this.address) {
            return;
        }
        this.addressForm = this.fb.group({
            id: [this.address.id],
            street: [this.address.street || '', Validators.required],
            street2: [this.address.street2 || ''],
            zip: [this.address.npa || '', [
                Validators.required,
                Validators.minLength(4),
            ]],
            city: [this.address.city || '', Validators.required],
            state: [this.address.state || '', Validators.required],
            country: [this.address.country || ''],
            latitude: [this.address.latitude || ''],
            longitude: [this.address.longitude || ''],
            is_default: [this.address.is_default || ''],
        });
    }

    cancel(evt: Event) {
        evt.preventDefault();
        this.cancelEmitter.emit();
    }

    save(evt: Event) {
        evt.preventDefault();
        this.addressForm.markAllAsTouched();
        if (this.addressForm.valid) {
            const address = new Address(this.addressForm.value);
            this.saveEmitter.emit(address);
        }
    }
}
