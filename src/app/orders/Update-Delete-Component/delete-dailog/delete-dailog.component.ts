import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-dailog',
  templateUrl: './delete-dailog.component.html',
  styleUrls: ['./delete-dailog.component.css']
})
export class DeleteDailogComponent implements OnInit {
  dialogRef: any;

  constructor() { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
