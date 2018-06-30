import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, getStatusText, ResponseOptions, STATUS } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService {

  private _database = {
    'users': [{
      id: 'user1',
      password: 'pwd1',
      token: 'tokena'
    }, {
      id: 'user2',
      password: 'pwd2',
      token: 'tokenb'
    },
    ]
  };

  private _services = {
    'api/login/': this.apiLogin
  };

  createDb(info?: RequestInfo) {
    return this._database;
  }

  post(info: RequestInfo) {
    return this._services[info.resourceUrl](info, this);
  }

  private apiLogin(info: RequestInfo, me: InMemoryDataService) {
    const credentials = info.utils.getJsonBody(info.req);
    const user = info.utils.findById(me._database.users, credentials.userName);
    if (user && (user.password === credentials.password)) {
      return me.createUserResponse(info, user);
    } else {
      return me.createUnauthorizedResponse(info);
    }
  }

  private createUserResponse(info: RequestInfo, user: any) {
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

  private createUnauthorizedResponse(info: RequestInfo) {
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

}
