import { Component, OnInit } from '@angular/core';
import { DeliveryLocation } from '../../models/delivery-location';
import { DialogOkCancelService } from '../../services/dialog-ok-cancel.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DialogResultValue } from '../../models/dialog-result-value.enum';
import { DeliveryLocationResult } from '../../services/dialog-edit-delivery-location.service';

export const DIALOG_NAME = 'EditDeliveryLocation';

@Component({
  selector: 'app-dialog-edit-delivery-location',
  templateUrl: './dialog-edit-delivery-location.component.html',
  styleUrls: ['./dialog-edit-delivery-location.component.css']
})
export class DialogEditDeliveryLocationComponent implements OnInit {

  deliveryLocation: DeliveryLocation = {
    address: null,
    id: null
  };
  operation: string;

  loading = false;

  constructor(
    private _dialogOkCancel: DialogOkCancelService<DeliveryLocationResult>,
    public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm(): void {
    this.bsModalRef.hide();
    this._dialogOkCancel.dialogResult({
      name: DIALOG_NAME,
      result: DialogResultValue.Ok,
      data: {
        deliveryLocation: this.deliveryLocation,
        operation: this.operation
      }
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
