import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { DialogOkCancelService } from '../../services/dialog-ok-cancel.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DialogResultValue } from '../../models/dialog-result-value.enum';

export const DIALOG_NAME = 'ConfirmRejectingInvoice';

@Component({
  selector: 'app-dialog-confirm-delete-customer',
  templateUrl: './dialog-confirm-delete-customer.component.html',
  styleUrls: ['./dialog-confirm-delete-customer.component.css']
})
export class DialogConfirmDeleteCustomerComponent implements OnInit {

  customer: Customer = {
    id: null,
    deliveryLocations: null,
    firstName: null,
    lastName: null
  };

  loading = false;

  constructor(
    private _dialogOkCancel: DialogOkCancelService<Customer>,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm(): void {
    this.bsModalRef.hide();
    this._dialogOkCancel.dialogResult({
      name: DIALOG_NAME,
      result: DialogResultValue.Ok,
      data: this.customer
    });
  }

  closeDialog(): void {
    this.bsModalRef.hide();
    this._dialogOkCancel.dialogResult({
      name: DIALOG_NAME,
      result: DialogResultValue.Cancel,
      data: null
    });
  }
}
