import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';

import { AuthenticationService } from '../../services/authentication.service';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
// tslint:disable-next-line:max-line-length
import { DIALOG_NAME as DIALOG_NAME_CONFIRM_DELETE_CUSTOMER } from '../dialog-confirm-delete-customer/dialog-confirm-delete-customer.component';
import { DialogConfirmDeleteCustomerService } from '../../services/dialog-confirm-delete-customer.service';
import { DialogOkCancelService } from '../../services/dialog-ok-cancel.service';
import { DialogResultValue } from '../../models/dialog-result-value.enum';
import * as CustomerActions from '../../store/customer-actions';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {

  private readonly _dialogConfirmDeleteSubscription: Subscription;

  customers: Observable<Customer[]>;
  loading = false;

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private _autheticationService: AuthenticationService,
    private _dialogOkCancelCustomerService: DialogOkCancelService<Customer>,
    private _dialogConfirmDeleteCustomerService: DialogConfirmDeleteCustomerService,
    private _store: Store<fromRoot.State>
  ) {
    this.customers = _store.select(state => {
      return state.customers.customers;
    });

    this._dialogConfirmDeleteSubscription = this._dialogOkCancelCustomerService.dialogResult$.subscribe(msg => {
      if (msg.name === DIALOG_NAME_CONFIRM_DELETE_CUSTOMER && msg.result === DialogResultValue.Ok) {
        this.loading = true;
        this._customerService.deleteCustomer(this._autheticationService.getToken(), msg.data.id).subscribe({
          next: customer => this._store.dispatch(new CustomerActions.CustomerDelete(customer)),
          complete: () => {
            this.loading = false;
          },
          error: error => {
            this.loading = false;
            console.error(error);
          }
        });
      }
    });

  }

  ngOnInit() {
    this.loading = true;

    this._customerService.getCustomers(this._autheticationService.getToken())
      .subscribe({
        next: customers => this._store.dispatch(new CustomerActions.CustomersGet(customers)),
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
    this._dialogConfirmDeleteSubscription.unsubscribe();
  }

  onNewItem(item: Customer): void {
    this._router.navigateByUrl(`customer`);
  }

  onEditItem(item: Customer): void {
    this._router.navigateByUrl(`customer/${item.id}`);
  }

  onDeleteItem(item: Customer): void {
    this._dialogConfirmDeleteCustomerService.showDialog(item);
  }
}
