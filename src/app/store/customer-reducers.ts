import { Customer } from '../models/customer';
import * as CustomerActions from './customer-actions';

export interface State {
    customers: Customer[];
    currentCustomer: Customer;
}

const initialState: State = {
    customers: [],
    currentCustomer: {
        deliveryLocations: [],
        firstName: null,
        lastName: null,
        id: null
    }
};

export function CustomersReducer(state: State = initialState, action: CustomerActions.All): State {
    switch (action.type) {
        case CustomerActions.CUSTOMERS_GET:
            return {
                ...state,
                customers: action.payload,
            };
        case CustomerActions.CUSTOMER_GET:
            return {
                ...state,
                currentCustomer: action.payload
            };
        case CustomerActions.CUSTOMER_NEW:
            return {
                ...state,
                currentCustomer: {
                    deliveryLocations: [],
                    firstName: null,
                    lastName: null,
                    id: null
                }
            };
        case CustomerActions.CUSTOMER_CREATE:
            return {
                ...state,
                currentCustomer: action.payload,
                customers: [...state.customers, action.payload]
            };
        case CustomerActions.CUSTOMER_UPDATE:
            return {
                ...state,
                currentCustomer: action.payload,
                customers: [...state.customers.filter(x => x.id !== action.payload.id), action.payload]
            };
            case CustomerActions.CUSTOMER_DELETE:
            return {
                ...state,
                currentCustomer: action.payload,
                customers: [...state.customers.filter(x => x.id !== action.payload.id)]
            };
        default:
            return state;
    }
}
