import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user = new BehaviorSubject("");
  constructor(private http:HttpClient) { }
  getAuthication(data:{}){
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPfUPPpiV41ngNGdmw6sQQhgwbv7weWkA",data)
  }
  setToLocal(idToken:string){
    localStorage.setItem("userToken",idToken);
    this.user.next(idToken);
  }
  getLocalData(){
    return localStorage.getItem("userToken");
  }
  getAutoLogin(){
    const idToken: any= this.getLocalData();
    this.user.next(idToken);
    return idToken;
  }
  deleteUser(){
    localStorage.removeItem('userToken');
    this.user.next("");
  }
}
