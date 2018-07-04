import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import { AuthenticationService } from '../../services/authentication.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { DeliveryLocation } from '../../models/delivery-location';
// tslint:disable-next-line:max-line-length
import { DIALOG_NAME as DIALOG_NAME_EDIT_DELIVERY_LOCATION } from '../dialog-edit-delivery-location/dialog-edit-delivery-location.component';
import { DialogEditDeliveryLocationService, DeliveryLocationResult } from '../../services/dialog-edit-delivery-location.service';
import { DialogOkCancelService } from '../../services/dialog-ok-cancel.service';
import { DialogResultValue } from '../../models/dialog-result-value.enum';
import { InMemoryDataService } from '../../services/in-memory-data.service';
import { Subscription } from 'rxjs/internal/Subscription';
import * as CustomerActions from '../../store/customer-actions';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  private readonly _dialogOkCancelDeliveryLocationSubscription: Subscription;

  customer: Customer;
  loading = false;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _autheticationService: AuthenticationService,
    private _dialogOkCancelDeliveryLocationService: DialogOkCancelService<DeliveryLocationResult>,
    private _dialogConfirmDeleteCustomerService: DialogEditDeliveryLocationService,
    private _InMemoryDataService: InMemoryDataService,
    private _store: Store<fromRoot.State>
  ) {
    _store.dispatch(new CustomerActions.CustomerNew());
    _store.select(state => state.customers.currentCustomer).subscribe(x => this.customer = x);

    this._dialogOkCancelDeliveryLocationSubscription = this._dialogOkCancelDeliveryLocationService.dialogResult$.subscribe(msg => {
      if (msg.name === DIALOG_NAME_EDIT_DELIVERY_LOCATION && msg.result === DialogResultValue.Ok) {
        if (msg.data.operation === 'new') {
          msg.data.deliveryLocation.id = this._InMemoryDataService.makeId();
          this.customer.deliveryLocations.push(msg.data.deliveryLocation);
        } else if (msg.data.operation === 'edit') {
          const item = this.customer.deliveryLocations.find(x => x.id === msg.data.deliveryLocation.id);
          item.address = msg.data.deliveryLocation.address;
        }
      }
    });
  }

  ngOnInit() {
    this.loading = true;
    const id = this._route.snapshot.paramMap.get('id');
    this._customerService.getCustomer(this._autheticationService.getToken(), id)
      .subscribe({
        next: customer => this._store.dispatch(new CustomerActions.CustomerGet(customer)),
        complete: () => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          console.error(error);
        }
      });
  }

  ngOnDestroy() {
    this._dialogOkCancelDeliveryLocationSubscription.unsubscribe();
  }

  onNewDeliveryLocation(): void {
    this._dialogConfirmDeleteCustomerService.showDialog({
      address: null,
      id: null
    }, 'new');
  }

  onEditDeliveryLocation(deliveryLocation: DeliveryLocation): void {
    this._dialogConfirmDeleteCustomerService.showDialog(Object.assign({}, deliveryLocation), 'edit');
  }

  onDeleteDeliveryLocation(deliveryLocation: DeliveryLocation): void {
    const item = this.customer.deliveryLocations.find(x => x.id === deliveryLocation.id);
    const index = this.customer.deliveryLocations.indexOf(item);
    if (index > -1) {
      this.customer.deliveryLocations.splice(index, 1);
    }
  }

  onGoBack(): void {
    this._location.back();
  }

  onSave(): void {
    this.loading = true;
    this._customerService.updateCustomer(this._autheticationService.getToken(), this.customer)
      .subscribe({
        next: customer => this._store.dispatch(new CustomerActions.CustomerUpdate(customer)),
        complete: () => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          console.error(error);
        }
      });
  }
}
