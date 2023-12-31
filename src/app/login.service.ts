import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpClient: HttpClient) { }
  redirectUrl: string = "";
  isLoginSuccess: boolean = false;
  currentUser?: User;
  email: any;
  URL: string = "https://api.cloudinary.com/v1_1/dxndjx3ct/image/upload"
  profilePicture?: string;
  otpShow:any;

  color:any

  loginFunction(user: any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8083/user/v1/login", user);
  }
  storeData(data1: any):Observable<any> {
    return this.httpClient.post<any>("http://localhost:8085/api/v2/register", data1);
  }
  getUser(email:any) {
    return this.httpClient.get<any>("http://localhost:8083/user/v1/register/"+email);
  }

  uploadProfilePicture(image: File) {
    let formData = new FormData()
    formData.append("file", image);
    formData.append("upload_preset", "ah8s5hkl");
    formData.append("api_key", "472197529232546");
    return this.httpClient.post(this.URL, formData);
  }

  token = new HttpHeaders().set("data", "application/json")

  //to check that the user is logged in or not !!
  storeToken(token: any) {
    localStorage.setItem("token", token);
    return true;
  }


  checkLogIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token === "" || token == null) {
      return false;
    }
    else {
      return true;
    }
  }

  getToken() {
    return localStorage.getItem("token")
  }

  removeToken() {
    localStorage.removeItem('token');
    return true;
  }
  setEmail(email:any)
  {
    return localStorage.setItem('emailId',email)
  }

  getNewpassword(email:any):Observable<any>{
    return this.httpClient.get<any>("http://localhost:8085/api/v2/getOTP/"+email)
  }

  createNewPassword(email:any,password:any,data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8085/api/v2/setPassword/${email}/${password}`,data)
  }


}
