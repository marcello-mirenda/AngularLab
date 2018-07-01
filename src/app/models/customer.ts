import { DeliveryLocation } from './delivery-location';

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    deliveryLocations: DeliveryLocation[];
}
