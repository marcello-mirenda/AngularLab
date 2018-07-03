import { TestBed, inject } from '@angular/core/testing';

import { DialogEditDeliveryLocationService } from './dialog-edit-delivery-location.service';

describe('DialogEditDeliveryLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogEditDeliveryLocationService]
    });
  });

  it('should be created', inject([DialogEditDeliveryLocationService], (service: DialogEditDeliveryLocationService) => {
    expect(service).toBeTruthy();
  }));
});
