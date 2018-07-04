import * as fromCustomer from './customer-reducers';

export interface State {
    customers: fromCustomer.State;
}

export const reducers = {
    customers: fromCustomer.CustomersReducer
};
