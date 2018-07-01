import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _http: HttpClient
  ) { }

  getCustomers(token: string): Observable<Customer[]> {
    return this._http.get<Customer[]>('/api/customer', {
      params: {
        'token': token
      }
    });
  }

  getCustomer(token: string, id: string): Observable<Customer> {
    return this._http.get<Customer>(`/api/customer/${id}`, {
      params: {
        'token': token
      }
    });
  }
}
