import {environment} from "../../../environments/environment";

export class BaseURL {
  public static BASE = environment.API_URL + 'api';
  public static BASE_NETWORK = environment.API_URL + 'api/network';
  public static BASE_HOME = environment.API_URL + 'api/home';
}

export class CommandURL {
  public static LOGIN = BaseURL.BASE + '/login';


  public static GETNETWORK = BaseURL.BASE_NETWORK + '';
  public static GETNETWORK_MEMBER = BaseURL.BASE_NETWORK + '/members';
  public static GETNETWORKPAGE = BaseURL.BASE_NETWORK + '/getPage';
  public static NETWORK_ADDNEW = BaseURL.BASE_NETWORK + '/addNew';
  public static NETWORK_UPDATE = BaseURL.BASE_NETWORK + '/update';
  public static NETWORK_DELETE = BaseURL.BASE_NETWORK + '/delete';
  public static ADD_CONTRACT_ME = BaseURL.BASE_HOME + '/addContractMe';
  public static GET_CONTRACT_ME_PAGE = BaseURL.BASE_HOME + '/getContractPage';


}
