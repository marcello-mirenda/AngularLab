import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoadAnimationComponent } from './components/load-animation/load-animation.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';
import { DialogConfirmDeleteCustomerComponent } from './components/dialog-confirm-delete-customer/dialog-confirm-delete-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    LoginComponent,
    LoadAnimationComponent,
    CustomerEditComponent,
    CustomerNewComponent,
    DialogConfirmDeleteCustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    BsModalRef,
    BsModalService,
  ],
  entryComponents: [
    DialogConfirmDeleteCustomerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
