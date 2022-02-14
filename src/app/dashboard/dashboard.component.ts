import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  see=0;
  operation="";
  currentItem="";
  constructor() { }

  ngOnInit(): void {
  }
  onTab(name:string){
    this.operation = name;
  }

  seeTable(num:number){
    console.log(num)
    this.see = num;
    if(num==2){
      this.currentItem = "EmpDetails";
    }else{
      this.currentItem = "SalDetails";
    }
  }
}
