import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

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
  }

  onGoBack(): void {
    this._location.back();
  }

  onSave(): void {
    this.loading = true;
    this._customerService.createCustomer(this._autheticationService.getToken(), this.customer)
      .subscribe({
        next: customer => {},
        complete: () => {
          this.loading = false;
        },
        error: error => {
          this.loading = false;
          console.error(error);
        }
      });
  }
}
