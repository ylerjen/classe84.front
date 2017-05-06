import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss']
})
export class UserPage implements OnInit {

  constructor(private usersService: UsersService) { }

    ngOnInit(): void {
        this.usersService.get(5);
    }

}
