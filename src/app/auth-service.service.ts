import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user = new BehaviorSubject(null);
  constructor(private http:HttpClient) { }
  getAuthication(data:{}){
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPfUPPpiV41ngNGdmw6sQQhgwbv7weWkA",data)
  }
}
