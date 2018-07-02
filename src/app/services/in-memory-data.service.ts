import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, getStatusText, ResponseOptions, STATUS } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

interface Service {
  search: string;
  func: (info: RequestInfo, me: InMemoryDataService) => Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService {

  private _database = {
    'tokens': [{
      'id': 'tokena',
      'user': 'user1'
    }, {
      'id': 'tokenb',
      'user': 'user2'
    }],
    'users': [{
      'id': 'user1',
      'password': 'pwd1',
      'token': 'tokena',
      'customers': [{
        'id': '001',
        'firstName': 'firstname user1 #1',
        'lastName': 'lastname user1  #1',
        'deliveryLocations': [{
          'id': '001',
          'address': 'address 001 #1'
        }, {
          'id': '002',
          'address': 'address 001 #2'
        }]
      }, {
        'id': '002',
        'firstName': 'firstname user1 #2',
        'lastName': 'lastname user1 #2',
        'deliveryLocations': []
      }, {
        'id': '003',
        'firstName': 'firstname user1 #3',
        'lastName': 'lastname user1 #3',
        'deliveryLocations': []
      }, {
        'id': '004',
        'firstName': 'firstname user1 #4',
        'lastName': 'lastname user1 #4',
        'deliveryLocations': []
      }, {
        'id': '005',
        'firstName': 'firstname user1 #5',
        'lastName': 'lastname user1 #5',
        'deliveryLocations': []
      }]
    }, {
      'id': 'user2',
      'password': 'pwd2',
      'token': 'tokenb',
      'customers': [{
        'id': '001',
        'firstName': 'firstname user2 #1',
        'lastName': 'lastname user2  #1',
        'deliveryLocations': [{
          'id': '001',
          'address': 'address 001 #1'
        }, {
          'id': '002',
          'address': 'address 001 #2'
        }]
      }, {
        'id': '002',
        'firstName': 'firstname user2 #2',
        'lastName': 'lastname user2 #2',
        'deliveryLocations': []
      }, {
        'id': '003',
        'firstName': 'firstname user2 #3',
        'lastName': 'lastname user2 #3',
        'deliveryLocations': []
      }, {
        'id': '004',
        'firstName': 'firstname user2 #4',
        'lastName': 'lastname user2 #4',
        'deliveryLocations': []
      }, {
        'id': '005',
        'firstName': 'firstname user2 #5',
        'lastName': 'lastname user2 #5',
        'deliveryLocations': []
      }]
    },
    ]
  };

  private _servicesGet: Service[] = [
    {search: '^/api/customer$', func: this.apiGetCustomers},
    {search: '^/api/customer/\\w+$', func: this.apiGetCustomer}
  ];

  private _servicesPost: Service[] = [
    {search: '^/api/login$', func: this.apiPostLogin},
    {search: '^/api/customer$', func: this.apiPostCustomer},
  ];

  private _servicesPut: Service[] = [
    {search: '^/api/customer$', func: this.apiPutCustomer},
  ];

  private _servicesDelete: Service[] = [
    {search: '^/api/customer/\\w+$', func: this.apiDeleteCustomer}
  ];

  createDb(info?: RequestInfo) {
    return this._database;
  }

  get(info: RequestInfo): Observable<any> {
    return this.CallService(info, this._servicesGet);
  }

  post(info: RequestInfo): Observable<any> {
    return this.CallService(info, this._servicesPost);
  }

  put(info: RequestInfo): Observable<any> {
    return this.CallService(info, this._servicesPut);
  }

  delete(info: RequestInfo): Observable<any> {
    return this.CallService(info, this._servicesDelete);
  }

  private CallService(info: RequestInfo, services: Service[]): Observable<any> {
    for (const service of services) {
      if (info.req.url.match(service.search)) {
        return service.func(info, this);
      }
    }
    throw new Error('Service not found.');
  }

  private apiGetCustomers(info: RequestInfo, me: InMemoryDataService): Observable<any> {
    const tokenId = info.query.get('token').reduce(x => x);
    const token = info.utils.findById(me._database.tokens, tokenId);
    if (token) {
      const user = info.utils.findById(me._database.users, token.user);
      if (user) {
        return me.createOkResponse(info, user.customers);
      } else {
        return me.createNotFoundResponse(info);
      }
    } else {
      return me.createNotFoundResponse(info);
    }
  }

  private apiGetCustomer(info: RequestInfo, me: InMemoryDataService): Observable<any> {
    const tokenId = info.query.get('token').reduce(x => x);
    const token = info.utils.findById(me._database.tokens, tokenId);
    if (token) {
      const user = info.utils.findById(me._database.users, token.user);
      if (user) {
        const parsedUrl = info.utils.parseRequestUrl(info.url);
        const customer = info.utils.findById(user.customers, parsedUrl.id);
        return me.createOkResponse(info, customer);
      } else {
        return me.createNotFoundResponse(info);
      }
    } else {
      return me.createNotFoundResponse(info);
    }
  }

  private apiPostLogin(info: RequestInfo, me: InMemoryDataService): Observable<any> {
    const credentials = info.utils.getJsonBody(info.req);
    const user = info.utils.findById(me._database.users, credentials.userName);
    if (user && (user.password === credentials.password)) {
      return me.createUserResponse(info, user);
    } else {
      return me.createUnauthorizedResponse(info);
    }
  }

  private apiPutCustomer(info: RequestInfo, me: InMemoryDataService): Observable<any> {
    const tokenId = info.query.get('token').reduce(x => x);
    const token = info.utils.findById(me._database.tokens, tokenId);
    if (token) {
      const user = info.utils.findById(me._database.users, token.user);
      if (user) {
        const customer = info.utils.getJsonBody(info.req) as Customer;
        const customerFound = info.utils.findById(user.customers, customer.id);
        if (customerFound) {
          customerFound.firstName = customer.firstName;
          customerFound.lastName = customer.lastName;
          return me.createOkResponse(info, customerFound);
        } else {
          return me.createNotFoundResponse(info);
        }
      } else {
        me.createUnauthorizedResponse(info);
      }
    } else {
      return me.createUnauthorizedResponse(info);
    }
  }

  private apiDeleteCustomer(info: RequestInfo, me: InMemoryDataService): Observable<any> {
    const tokenId = info.query.get('token').reduce(x => x);
    const token = info.utils.findById(me._database.tokens, tokenId);
    if (token) {
      const user = info.utils.findById(me._database.users, token.user);
      if (user) {
        const parsedUrl = info.utils.parseRequestUrl(info.url);
        const customerFound = info.utils.findById(user.customers, parsedUrl.id);
        if (customerFound) {
          const index = user.customers.indexOf(customerFound);
          if (index > -1) {
            user.customers.splice(index, 1);
          }
          return me.createOkResponse(info, customerFound);
        } else {
          return me.createNotFoundResponse(info);
        }
      } else {
        me.createUnauthorizedResponse(info);
      }
    } else {
      return me.createUnauthorizedResponse(info);
    }
  }

  private apiPostCustomer(info: RequestInfo, me: InMemoryDataService): Observable<any> {
    const tokenId = info.query.get('token').reduce(x => x);
    const token = info.utils.findById(me._database.tokens, tokenId);
    if (token) {
      const user = info.utils.findById(me._database.users, token.user);
      if (user) {
        const customer = info.utils.getJsonBody(info.req) as Customer;
        const customerFound = info.utils.findById(user.customers, customer.id);
        if (!customerFound) {
          customer.id = me.makeId();
          user.customers.push(customer);
          return me.createOkResponse(info, customer);
        } else {
          return me.createBadRequestResponse(info, undefined);
        }
      } else {
        me.createUnauthorizedResponse(info);
      }
    } else {
      return me.createUnauthorizedResponse(info);
    }
  }

  private createUserResponse(info: RequestInfo, user: any): Observable<any> {
    return info.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: user.token,
        status: STATUS.OK,
        statusText: getStatusText(STATUS.OK),
        headers: info.headers,
        url: info.url
      };
      return options;
    });
  }

  private createUnauthorizedResponse(info: RequestInfo): Observable<any> {
    return info.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: 'token',
        status: STATUS.UNAUTHORIZED,
        statusText: getStatusText(STATUS.UNAUTHORIZED),
        headers: info.headers,
        url: info.url
      };
      return options;
    });
  }

  private createNotFoundResponse(info: RequestInfo): Observable<any> {
    return info.utils.createResponse$(() => {
      const options: ResponseOptions = {
        status: STATUS.NOT_FOUND,
        statusText: getStatusText(STATUS.NOT_FOUND),
        headers: info.headers,
        url: info.url
      };
      return options;
    });
  }

  private createOkResponse(info: RequestInfo, body: any): Observable<any> {
    return info.utils.createResponse$(() => {
      const options: ResponseOptions = {
        body: body,
        status: STATUS.OK,
        statusText: getStatusText(STATUS.OK),
        headers: info.headers,
        url: info.url
      };
      return options;
    });
  }

  private createBadRequestResponse(info: RequestInfo, body: any): Observable<any> {
    return info.utils.createResponse$(() => {
      const options: ResponseOptions = {
        status: STATUS.BAD_REQUEST,
        statusText: getStatusText(STATUS.BAD_REQUEST),
        headers: info.headers,
        url: info.url
      };
      return options;
    });
  }

  private makeId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
