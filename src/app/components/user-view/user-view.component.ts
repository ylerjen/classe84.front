import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/User';

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


  constructor() { }

  ngOnInit() {
  }

}
