import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {NetWork} from "../_models/common.model";
import {CommandURL} from "../shared/constant/URLAPI";
import {UtilsValue} from "../store/UtilsValue";


@Injectable({providedIn: 'root'})
export class NetworkService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<HttpResponse<NetWork[]>>(CommandURL.GETNETWORK, UtilsValue.ResponeType1);
  }

  getAllMembers(networkID) {
    return this.http.get<HttpResponse<NetWork[]>>(CommandURL.GETNETWORK_MEMBER + `/${networkID}`, UtilsValue.ResponeType1);
  }

  getAllPage(pageNumber, pageSize, searchText) {
    return this.http.post<HttpResponse<NetWork[]>>(CommandURL.GETNETWORKPAGE, {
      pageNumber,
      pageSize,
      searchText
    }, UtilsValue.ResponeType1);
  }

  addNew(body) {
    return this.http.post<HttpResponse<any>>(CommandURL.NETWORK_ADDNEW, body, UtilsValue.ResponeType1);
  }

  update(body) {
    return this.http.post<HttpResponse<any>>(CommandURL.NETWORK_UPDATE, body, UtilsValue.ResponeType1);
  }

  delete(body) {
    return this.http.post<HttpResponse<any>>(CommandURL.NETWORK_DELETE, body, UtilsValue.ResponeType1);
  }
}
