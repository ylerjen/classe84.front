import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { Subscription } from 'app/models/Subscription';
import { IGlobalState } from 'app/stores/globalState';
import { ISubscriptionState } from 'app/stores/subscription/subscription.reducer';
import { GetEventStart } from 'app/actions/event.actions';
import { GetSubscriptionStart } from 'app/actions/subscription.actions';

@Component({
  selector: 'app-event-detail-layout',
  templateUrl: './event-detail-layout.component.html',
  styleUrls: ['./event-detail-layout.component.scss']
})
export class EventDetailLayoutComponent implements OnInit {

  public subscriberList: Array<Subscription>;

  constructor(
      private _store: Store<IGlobalState>,
      private _route: ActivatedRoute,
  ) {
      this._store.select(store => store.subscriptionsState)
          .subscribe(
              (subscrState: ISubscriptionState) => this.subscriberList = subscrState.subscriptionList
          );
  }

  ngOnInit() {
      this._route.params
          .subscribe( (routeData: Params) => {
              const id = routeData.id;
              this._store.dispatch(new GetEventStart(id));
              this._store.dispatch(new GetSubscriptionStart(id));
          });
  }

}
