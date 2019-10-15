import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from '@models/Address';

@Component({
    selector: 'app-address-form-viewer',
    templateUrl: './address-form-viewer.component.html',
    styleUrls: ['./address-form-viewer.component.scss']
})
export class AddressFormViewerComponent implements OnInit, OnDestroy {
    private sub: Subscription;

    public address: Address;

    constructor(
        private _activeRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.address = new Address({street: 'Rue de '});
        this.sub = this._activeRoute.queryParams
            .subscribe(
                (routeData: Params) => {
                    console.log(routeData);
                }
            );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
