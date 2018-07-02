import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDeleteCustomerComponent } from './dialog-confirm-delete-customer.component';

describe('DialogConfirmDeleteCustomerComponent', () => {
  let component: DialogConfirmDeleteCustomerComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmDeleteCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmDeleteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
