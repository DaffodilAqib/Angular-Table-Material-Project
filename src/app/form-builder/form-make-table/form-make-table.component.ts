import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-form-make-table',
  templateUrl: './form-make-table.component.html',
  styleUrls: ['./form-make-table.component.css']
})
export class FormMakeTableComponent implements OnInit, AfterViewInit, OnDestroy {

  formMakerData: any;
  formSave: any;
  subscription = new Subscription();
  displayedColumns = ["FormName", "FormId", "Fields", "Action"];
  displayedColumn = ["FormName", "FormId"];
  constructor(
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    public formData: FormDataService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.matIconRegistry.addSvgIcon(
      "visibility",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/eye-solid.svg")
    );

    let dataS: any = [];
    // let pre_data: any = {}
    // this.subscription.add(this.formData.Data$
    //   .subscribe(res => {
    //     console.log("From Service :-", res);
    //     dataS.push(res);
    //     this.formSave = Array.from(dataS);
    //     console.log("DataSource:-", this.formSave);
    //   }));
    // this.subscription = this.formData.Data$
    //   .subscribe(res => {
    //     console.log("From Service :-", res);
    //     dataS.push(res);
    //     this.formSave = Array.from(dataS);
    //     console.log("DataSource:-", this.formSave);
    //   });
    this.formSave = this.formData.getData();
    console.log("Make Table Data",this.formSave);


  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
  }

  OpenFormMake(data: any) {
    console.log(data);
    // this.formMakerData = JSON.stringify(data);
    this.router.navigate(['/form-maker'], { queryParams: { value:'no'}, state: { json:data}});
    // this.router.navigateByUrl('/form-maker', ,{ state: { json:this.formMakerData} });
    // this.formData.Data$.next(data);

  }

}
