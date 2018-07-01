import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer = {
    deliveryLocations: [],
    firstName: null,
    id: null,
    lastName: null
  };
  loading = false;

  constructor(
    private _location: Location,
    private _route: ActivatedRoute,
    private _customerService: CustomerService,
    private _autheticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loading = true;
    const id = this._route.snapshot.paramMap.get('id');
    this._customerService.getCustomer(this._autheticationService.getToken(), id)
      .subscribe({
        next: customer => this.customer = customer,
        complete: () => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          console.error(error);
        }
      });
  }

  onGoBack(): void {
    this._location.back();
  }
}
