import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeliveryLocation } from '../models/delivery-location';
import { DialogEditDeliveryLocationComponent } from '../components/dialog-edit-delivery-location/dialog-edit-delivery-location.component';

export interface DeliveryLocationResult {
  deliveryLocation: DeliveryLocation;
  operation: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogEditDeliveryLocationService {

  config = {
    class: 'modal-lg',
    ignoreBackdropClick: true
  };
  private _bsModalRef: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  public showDialog(deliveryLocation: DeliveryLocation, operation: string): void {
    this._bsModalRef = this.bsModalService.show(DialogEditDeliveryLocationComponent, this.config);
    this._bsModalRef.content.deliveryLocation = deliveryLocation;
    this._bsModalRef.content.operation = operation;
  }
}
