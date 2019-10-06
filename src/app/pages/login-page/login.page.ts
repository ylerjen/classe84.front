import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RECTO, VERSO } from 'app/shared/flip/flip.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'login-page',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    private sub: Subscription;

    public flipface = RECTO;

    constructor(
        private _route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.sub = this._route.queryParams.subscribe(
            (params) => {
                if (params.recovery) {
                    this.flipface = VERSO;
                } else {
                    this.flipface = RECTO;
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
