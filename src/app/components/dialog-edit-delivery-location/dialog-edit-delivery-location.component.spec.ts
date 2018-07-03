import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDeliveryLocationComponent } from './dialog-edit-delivery-location.component';

describe('DialogEditDeliveryLocationComponent', () => {
  let component: DialogEditDeliveryLocationComponent;
  let fixture: ComponentFixture<DialogEditDeliveryLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditDeliveryLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditDeliveryLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
