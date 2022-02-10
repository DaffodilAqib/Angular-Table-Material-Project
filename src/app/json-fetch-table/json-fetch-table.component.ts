import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, pluck, take,from, mergeAll, concat, Observer } from 'rxjs';
import { DataFetchService } from '../data-fetch.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-json-fetch-table',
  templateUrl: './json-fetch-table.component.html',
  styleUrls: ['./json-fetch-table.component.css']
})
export class JsonFetchTableComponent implements OnInit{
  @Input() item="";
  displayedColumns = [
    "userId",
    "jobTitleName",
    "firstName",
    "lastName",
    "preferredFullName",
    "employeeCode",
    "region",
    "phoneNumber",
    "emailAddress"
  ];
  dataSource: any;
  data:any = []
  constructor(public http:HttpClient,
  private dataFetch:DataFetchService) { }

  ngOnInit(): void {
    console.log(this.item);
    if(this.item=="EmpDetails"){
      this.dataFetch.getData("https://firestore.googleapis.com/v1/projects/employee-das/databases/(default)/documents/Employee")
      .subscribe((res:any)=>{
      res.documents.forEach((element:any) => {
        this.data.push({"FirstName":element['fields']['FirstName']['stringValue'],"LastName":element['fields']['LastName']['stringValue']});
      });
      this.dataSource = this.data;
      this.displayedColumns = ["FirstName","LastName"];
      })
    }else{
      this.dataFetch.getData("http://localhost:3000/Employees")
      .subscribe(response=>{
        this.dataSource = response;
       console.log(this.dataSource);
      })

    }
  }
}
function From(documents: any): any {
  throw new Error('Function not implemented.');
}

