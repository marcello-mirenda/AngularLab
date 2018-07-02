import { Injectable } from '@angular/core';
import { DialogResult } from '../models/dialog-result';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogOkCancelService<T> {

  private _dialogResultSource = new Subject<DialogResult<T>>();

  // Observable string streams
  dialogResult$ = this._dialogResultSource.asObservable();

  constructor() { }

  // Service message commands
  dialogResult(result: DialogResult<T>) {
    this._dialogResultSource.next(result);
  }
}
