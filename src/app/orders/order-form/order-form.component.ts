import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  hide = true;
  orderForm= new FormGroup({
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    phonenumber: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    porduct_details: new FormGroup({
      product_name: new FormControl('',[Validators.required]),
      prodcut_id: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required])
    })
  })
 



  constructor(public dialogRef: MatDialogRef<OrderFormComponent>) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.orderForm.value);
  }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  getErrorMessage() {
    if (this.orderForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.orderForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
