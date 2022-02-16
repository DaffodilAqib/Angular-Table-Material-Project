import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-name',
  templateUrl: './form-name.component.html',
  styleUrls: ['./form-name.component.css']
})
export class FormNameComponent implements OnInit {

  data = {name:""}
  constructor(public dialogRef: MatDialogRef<FormNameComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
