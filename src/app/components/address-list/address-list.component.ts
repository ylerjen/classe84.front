import { Component, Input } from '@angular/core';

import { Address } from '../../models/Address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent {

  @Input()
  public addressList: Address[] = [];

}
