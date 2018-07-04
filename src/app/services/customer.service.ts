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

  updateCustomer(token: string, customer: Customer): Observable<Customer> {
    return this._http.put<Customer>('/api/customer', customer, {
      params: {
        'token': token
      }
    });
  }

  createCustomer(token: string, customer: Customer): Observable<Customer> {
    return this._http.post<Customer>('/api/customer', customer, {
      params: {
        'token': token
      }
    });
  }

  deleteCustomer(token: string, id: string): Observable<Customer> {
    return this._http.delete<Customer>(`/api/customer/${id}`, {
      params: {
        'token': token
      }
    });
  }
}
