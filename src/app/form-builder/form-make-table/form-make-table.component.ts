import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-make-table',
  templateUrl: './form-make-table.component.html',
  styleUrls: ['./form-make-table.component.css']
})
export class FormMakeTableComponent implements OnInit, AfterViewInit {

  @Input() data = new Subject();


  dataSource: any;
  displayedColumns=["FormName","FormId","Fields","Action"];
  displayedColumn=["FormName","FormId","Fields"];
  constructor() { }

  ngOnInit(): void {
    let dataS: any = [];
    // let pre_data: any = {}
    this.data.subscribe((res:any)=>{
      console.log("From Form Making Table Component :-",res);
      // {Name:"",FormId:"",Fields:""}
      // pre_data["FormName"]= res.formName;
      // pre_data["FormId"]=res.id
      let data_fields = ""
      for(let i=0;i<res.fields.length;i++){
        data_fields += " "+res.fields[i].name;
      }
      // pre_data["Fields"]=data_fields;
      // this.dataS.push(pre_data);
      dataS.push({"FormName":res.formName, "FormId":res.id,"Fields":data_fields})
      this.dataSource = Array.from(dataS);
      console.log("Data Source:-",this.dataSource);
    })
  }
  ngAfterViewInit(): void {
    
  }

}
