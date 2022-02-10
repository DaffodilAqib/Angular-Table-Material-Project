import { Component, OnInit, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OrderFormComponent } from './order-form/order-form.component';

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
    "email",
    "Product",
    "ProductId",
    "Price"
  ];
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(OrderFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
