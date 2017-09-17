import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTE_URL } from '../../config/router.config';
import { RECTO, VERSO } from '../../shared/flip/flip.component';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPageComponent implements OnInit {

    public flipface = RECTO;

    constructor(
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this._route.queryParams.subscribe(
            (params) => {
                if (params.recovery) {
                    this.flipface = VERSO;
                } else {
                    this.flipface = RECTO;
                }
            }
        );
    }
}
