import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderService } from './order.service';
import { DeleteDailogComponent } from './Update-Delete-Component/delete-dailog/delete-dailog.component';
import { UpdateDailogComponent } from './Update-Delete-Component/update-dailog/update-dailog.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  dataSource:any;
  displayedColumns = [
    "FirstName",
    "LastName",
    "PhoneNumber",
    "Email",
    "Product",
    "ProductId",
    "Price",
    "Action"
  ];
  displayedColumn = [
    "FirstName",
    "LastName",
    "PhoneNumber",
    "Email",
    "Product",
    "ProductId",
    "Price",
  ];

  constructor(private dialog:MatDialog,
     private orderData:OrderService,
     private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setTableData();
    this.matIconRegistry.addSvgIcon(
      "update",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/pen-nib-solid.svg")
    );
  }

  openDail(name:string,data:any){
    if(name=="Delete"){
      const dialogRef = this.dialog.open(DeleteDailogComponent);
      dialogRef.afterClosed().subscribe(res=>{
        if(res=="yes"){
          console.log("request Server for deleting row");
          console.log("url for deletion is ",data);
          this.orderData.deleteData("https://firestore.googleapis.com/v1/"+data).subscribe(res=>{
            this.setTableData();
            console.log("Deletion Completed Successfully");
          })
        }
        else{
          console.log("request Rejected");
        }
      })
    }
    else if(name=="Update"){
      console.log("Updating the row");
      let mess: string[] = [];
      let count=0;
      var newData : any = { fields: {} }
      
      const dialogRef = this.dialog.open(UpdateDailogComponent,{data})
      dialogRef.afterClosed().subscribe((res:any)=>{
        if(data.FirstName!==res.firstname){
          mess.push("updateMask.fieldPaths=firstname"); 
          newData.fields.firstname = {stringValue: res.firstname} 
          count=1;
        }
        if(data.LastName!==res.lastname){
          mess.push("updateMask.fieldPaths=lastname");
          newData.fields.lastname = {stringValue: res.lastname}
          count=1;
        }
        if(data.PhoneNumber!==res.phonenumber){
          mess.push("updateMask.fieldPaths=phonenumber");
          newData.fields.phonenumber = {stringValue: res.phonenumber}
          count=1;
        }
        if(data.Email!==res.email){
          mess.push("updateMask.fieldPaths=email");
          newData.fields.email = {stringValue: res.email};
          count=1;
        }
        if(data.Product!==res.porduct_details.product_name){
          mess.push("updateMask.fieldPaths=productname");
          newData.fields.productname = {stringValue: res.porduct_details.product_name}
          count=1;
        }
        if(data.ProductId!==res.porduct_details.prodcut_id){
          mess.push("updateMask.fieldPaths=productid");
          newData.fields.productid = {stringValue: res.porduct_details.prodcut_id}
          count=1;
        }
        if(data.Price!==res.porduct_details.price){
          mess.push("updateMask.fieldPaths=price");
          newData.fields.price = {integerValue: res.porduct_details.price}
          count=1;
        }
        if(count==1){
          console.log("mess update :-",mess.join('&'));
          console.log("Update value:-",newData);
          this.orderData.patchData("https://firestore.googleapis.com/v1/"+data.Action+"?"+mess.join('&'),newData)
          .subscribe(res=>{
            console.log("successfull to update data:-",res);
            this.setTableData();
          })
        }
      })
    }
  }
  openDialog(){
    const dialogRef = this.dialog.open(OrderFormComponent);

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      this.orderData.postData({
        "fields": { 
          "firstname": { "stringValue": result.firstname }, 
          "lastname": { "stringValue": result.lastname }, 
          "phonenumber": { "stringValue": result.phonenumber }, 
          "email": { "stringValue": result.email }, 
          "productname": { "stringValue": result.porduct_details.product_name }, 
          "productid": { "stringValue": result.porduct_details.prodcut_id }, 
          "price": { "integerValue": result.porduct_details.price } 
      }
      }).subscribe(res=>{
        this.setTableData();
      })
    });
  }
  setTableData() {
    let data: any = [];
    this.orderData.getData()
      .subscribe((res: any) => {
        res.documents.forEach((element: any) => {
          data.push({
            "FirstName": element['fields']['firstname']['stringValue'],
            "LastName": element['fields']['lastname']['stringValue'],
            "PhoneNumber": element['fields']['phonenumber']['stringValue'],
            "Email": element['fields']['email']['stringValue'],
            "Product": element['fields']['productname']['stringValue'],
            "ProductId": element['fields']['productid']['stringValue'],
            "Price": element['fields']['price']['integerValue'],
            "Action": element.name
          });
        });
        this.dataSource = data;
      })
  }

}
