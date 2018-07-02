import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Customer } from '../models/customer';
// tslint:disable-next-line:max-line-length
import { DialogConfirmDeleteCustomerComponent } from '../components/dialog-confirm-delete-customer/dialog-confirm-delete-customer.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmDeleteCustomerService {

  config = {
    class: 'modal-lg',
    ignoreBackdropClick: true
  };
  private _bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  public showDialog(customer: Customer): void {
    this._bsModalRef = this.bsModalService.show(DialogConfirmDeleteCustomerComponent, this.config);
    this._bsModalRef.content.customer = customer;
  }
}
