import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  loading = false;

  constructor(
    private _router: Router,
    private _customerService: CustomerService,
    private _autheticationService: AuthenticationService
  ) { }

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

  }

  onEditItem(item: Customer): void {
    this._router.navigateByUrl(`customer/${item.id}`);
  }

  onDeleteItem(item: Customer): void {

  }
}
