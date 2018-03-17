import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RECTO, VERSO } from 'app/shared/flip/flip.component';

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
