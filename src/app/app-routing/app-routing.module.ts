import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from '../components/customers/customers.component';
import { LoginComponent } from '../components/login/login.component';
import { CustomerEditComponent } from '../components/customer-edit/customer-edit.component';
import { CustomerNewComponent } from '../components/customer-new/customer-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer/:id', component: CustomerEditComponent },
  { path: 'customer', component: CustomerNewComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
