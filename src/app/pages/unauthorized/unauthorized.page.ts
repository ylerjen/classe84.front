import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'unauthorized-page',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class UnauthorizedPage implements OnInit {

  public isLoggedIn = false;

  constructor(
    private _authSrvc: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this._authSrvc.isLoggedIn();
  }

}
