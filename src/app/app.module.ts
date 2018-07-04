import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './services/in-memory-data.service';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { CustomerNewComponent } from './components/customer-new/customer-new.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DialogConfirmDeleteCustomerComponent } from './components/dialog-confirm-delete-customer/dialog-confirm-delete-customer.component';
import { DialogEditDeliveryLocationComponent } from './components/dialog-edit-delivery-location/dialog-edit-delivery-location.component';
import { LoadAnimationComponent } from './components/load-animation/load-animation.component';
import { LoginComponent } from './components/login/login.component';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    CustomerEditComponent,
    CustomerNewComponent,
    CustomersComponent,
    DialogConfirmDeleteCustomerComponent,
    DialogEditDeliveryLocationComponent,
    LoadAnimationComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    HttpClientModule,
    ModalModule.forRoot(),
    StoreModule.forRoot(reducers)
  ],
  providers: [
    BsModalRef,
    BsModalService,
  ],
  entryComponents: [
    DialogConfirmDeleteCustomerComponent,
    DialogEditDeliveryLocationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
