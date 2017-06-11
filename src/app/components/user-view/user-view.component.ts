import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { User } from '../../models/User';
import { UsersService } from '../../services/users/users.service';
import { LoginService } from '../../services/login/login.service';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

    @Input()
    private isLoading = true;

    @Input()
    private user: User;

    constructor(
        private _userSrv: UsersService,
        private _loginService: LoginService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this._route.params
            .subscribe( (routeData: Params) => this._userSrv.get(routeData.id) );
    }
}
