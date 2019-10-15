import { Component, OnInit, Input } from '@angular/core';
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
            street2: [this.address.street2 || '', Validators.required],
            zip: [this.address.npa || '', Validators.required],
            city: [this.address.city || '', Validators.required],
            state: [this.address.state || '', Validators.required],
            country: [this.address.country || ''],
            latitude: [this.address.latitude || ''],
            longitude: [this.address.longitude || ''],
            is_default: [this.address.is_default || ''],
        });
    }

}
