import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {CommandURL} from "../shared/constant/URLAPI";
import {UtilsValue} from "../store/UtilsValue";
import {NetWork} from "../_models/common.model";

@Injectable({providedIn: 'root'})
export class HomeService {
  constructor(private http: HttpClient) {
  }

  addContract(body) {
    return this.http.post<HttpResponse<any>>(CommandURL.ADD_CONTRACT_ME, body, UtilsValue.ResponeType1);
  }

  getContracMes(pageNumber, pageSize, searchText) {
    return this.http.post<HttpResponse<NetWork[]>>(CommandURL.GET_CONTRACT_ME_PAGE, {
      pageNumber,
      pageSize,
      searchText
    }, UtilsValue.ResponeType1);
  }

}
