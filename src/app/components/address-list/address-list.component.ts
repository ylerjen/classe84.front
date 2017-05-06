import { Component, OnInit } from '@angular/core';

import { Address } from '../../models/Address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  private addressList: Address[] = [];

  constructor() { }

  ngOnInit() {
  }

}
