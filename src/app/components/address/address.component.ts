import { Component, OnInit, Input } from '@angular/core';

import { Address } from '../../models/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  @Input()
  private address: Address;

  constructor() { }

  ngOnInit() {
  }

}
