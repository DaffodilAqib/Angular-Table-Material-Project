import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  getData(){
    return this.http.get("https://firestore.googleapis.com/v1/projects/employee-das/databases/(default)/documents/Order")
  }
  postData(data:any){
    return this.http.post("https://firestore.googleapis.com/v1/projects/employee-das/databases/(default)/documents/Order",data)
  }
  deleteData(url:any){
    return this.http.delete(url);
  }
  patchData(url:string,data:any){
    return this.http.patch(url,data);
  }
}
