import { TestBed, inject } from '@angular/core/testing';

import { DialogConfirmDeleteCustomerService } from './dialog-confirm-delete-customer.service';

describe('DialogConfirmDeleteCustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogConfirmDeleteCustomerService]
    });
  });

  it('should be created', inject([DialogConfirmDeleteCustomerService], (service: DialogConfirmDeleteCustomerService) => {
    expect(service).toBeTruthy();
  }));
});
