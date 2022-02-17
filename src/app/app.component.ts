import { Component, OnInit } from '@angular/core';
import { FormDataService } from './form-builder/form-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular-Assignment1';

  constructor(public formData: FormDataService){

  }
  ngOnInit(): void {
      this.formData.Data$.subscribe(res=>{
        console.log("app from Data",res);
      })
  }
  
  
}
