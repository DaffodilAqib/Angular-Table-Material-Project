import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  Data$ = new Subject();
  data: any = []
  constructor() { }
  saveData(obj:any){
    this.data.push(obj);
  }
  getData(){
    return this.data;
  }
}
