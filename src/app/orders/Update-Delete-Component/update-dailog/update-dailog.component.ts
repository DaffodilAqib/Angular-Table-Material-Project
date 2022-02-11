import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dailog',
  templateUrl: './update-dailog.component.html',
  styleUrls: ['./update-dailog.component.css']
})
export class UpdateDailogComponent implements OnInit {

  orderForm= new FormGroup({
    firstname: new FormControl(this.data.FirstName,[Validators.required]),
    lastname: new FormControl(this.data.LastName,[Validators.required]),
    phonenumber: new FormControl(this.data.PhoneNumber,[Validators.required]),
    email: new FormControl(this.data.Email,[Validators.required]),
    porduct_details: new FormGroup({
      product_name: new FormControl(this.data.Product,[Validators.required]),
      prodcut_id: new FormControl(this.data.ProductId,[Validators.required]),
      price: new FormControl(this.data.Price,[Validators.required])
    })
  })
  constructor(
    public dialogRef: MatDialogRef<UpdateDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log("FirstName:-",this.data.FirstName);
  }
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
