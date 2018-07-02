import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DialogResultValue } from '../../models/dialog-result-value.enum';
import { DialogOkCancelService } from '../../services/dialog-ok-cancel.service';
// tslint:disable-next-line:max-line-length
import { DIALOG_NAME as DIALOG_NAME_CONFIRM_DELETE_CUSTOMER } from '../dialog-confirm-delete-customer/dialog-confirm-delete-customer.component';
import { DialogConfirmDeleteCustomerService } from '../../services/dialog-confirm-delete-customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  private readonly _dialogConfirmDeleteSubscription: Subscription;

  customers: Customer[];
  loading = false;

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private _autheticationService: AuthenticationService,
    private _dialogOkCancelCustomerService: DialogOkCancelService<Customer>,
    private _dialogConfirmDeleteCustomerService: DialogConfirmDeleteCustomerService
  ) {
    this._dialogConfirmDeleteSubscription = this._dialogOkCancelCustomerService.dialogResult$.subscribe(msg => {
      if (msg.name === DIALOG_NAME_CONFIRM_DELETE_CUSTOMER && msg.result === DialogResultValue.Ok) {
        this.loading = true;
        this._customerService.deleteCustomer(this._autheticationService.getToken(), msg.data.id).subscribe({
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
    this.customers = [];
    this.loading = true;
    this._customerService.getCustomers(this._autheticationService.getToken())
      .subscribe({
        next: customers => this.customers = customers,
        complete: () => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          console.error(error);
        }
      });
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
