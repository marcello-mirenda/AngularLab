import { Action } from '@ngrx/store';
import { Customer } from '../models/customer';

export const CUSTOMERS_GET = '[Customers] Get';
export const CUSTOMER_GET = '[Customer] Get';
export const CUSTOMER_NEW = '[Customer] New';
export const CUSTOMER_UPDATE = '[Customer] Update';
export const CUSTOMER_CREATE = '[Customer] Create';
export const CUSTOMER_DELETE = '[Customer] Delete';

export class CustomersGet implements Action {
    readonly type = CUSTOMERS_GET;

    constructor(public payload: Customer[]) {
    }
}

export class CustomerGet implements Action {
    readonly type = CUSTOMER_GET;

    constructor(public payload: Customer) {
    }
}

export class CustomerNew implements Action {
    readonly type = CUSTOMER_NEW;

    constructor() {
    }
}

export class CustomerUpdate implements Action {
    readonly type = CUSTOMER_UPDATE;

    constructor(public payload: Customer) {
    }
}

export class CustomerCreate implements Action {
    readonly type = CUSTOMER_CREATE;

    constructor(public payload: Customer) {
    }
}

export class CustomerDelete implements Action {
    readonly type = CUSTOMER_DELETE;

    constructor(public payload: Customer) {
    }
}

export type All
    = CustomersGet
    | CustomerGet
    | CustomerNew
    | CustomerCreate
    | CustomerUpdate
    | CustomerDelete;
