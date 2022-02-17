import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable,fromEvent, Subject } from 'rxjs';
import { FormDataService } from './form-data.service';
import { FormNameComponent } from './form-name/form-name.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  //tools = ["Label","AreaField","Radio button","Check box","Button"];
  tools = [ {name:"TextField",input_type:"text"}, {name:"Label",input_type:"Label"}, {name:"Button",input_type:"button"},{name:"name"},{name:"Address"},{name:"Email"},{name:"Password"}];
  formTools: any = [];
  hide = true;
  data: object = [];
  json_data: any = {}
  formName = "Enter Form Name";
  formId="";

  // vis_form_name = true;
  
  // @ViewChild('FormName') FormName:ElementRef | any

  constructor(
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    public formData: FormDataService
  ) { }

  changeFormName(){
    // this.vis_form_name = false;
    const dialogRef = this.dialog.open(FormNameComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.formName = result;
      }
      
    });
  }

  ngOnInit(): void {
    // debugger
    // let keyups = fromEvent(this.FormName?.nativeElement, "click");
    // keyups.subscribe(data=>{console.log("Data from input",data)})

    this.matIconRegistry.addSvgIcon(
      "visibility_off",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/eye-slash-solid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "visibility",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/eye-solid.svg")
    );
  }
  // displayName(){
  //   console.log(this.FormName.nativeElement.value);
  //   let keyups = fromEvent(this.FormName?.nativeElement, "keyup");
  //   keyups.subscribe(data=>{console.log("Data from input",data)})
  // }

  onSubmit(){
    console.log("model:-",this.data);
    this.json_data["FormName"] = this.formName;
    this.json_data["FormId"] = Math.random().toString(36).substr(2, 9); 
    this.json_data["Fields"] = [];
    for(let i=0;i<this.formTools.length;i++ ){
      // console.log(this.formTools[i]);
      if(this.formTools[i].name=="name"){
        this.json_data.Fields.push({"name":"firstName", "label": "First Name", "value": "", "type": "text", "validators":{}});
        this.json_data.Fields.push({"name":"lastName", "label": "Last Name", "value": "", "type": "text", "validators":{}})
      }
      else if(this.formTools[i].name=="Address"){
        this.json_data.Fields.push({"name":"street", "label": "Street", "value": "", "type": "text", "validators":{}});
        this.json_data.Fields.push({"name":"city", "label": "City", "value": "", "type": "text", "validators":{}});
        this.json_data.Fields.push({"name":"state", "label": "State", "value": "", "type": "text", "validators":{}});
        this.json_data.Fields.push({"name":"zipcode", "label": "Zipcode", "value": "", "type": "number", "validators":{}});
      }
      else if(this.formTools[i].name=="Email"){
        this.json_data.Fields.push({"name":"email", "label": "Email", "value": "", "type": "email", "validators":{}})
      }
      else if(this.formTools[i].name=="Password"){
        this.json_data.Fields.push({"name":"password", "label": "Password", "value": "", "type": "password", "validators":{}})
      }

    }
    console.log("Final json :-",this.json_data);
    // this.formData.Data$.next(this.json_data);
    this.formData.saveData(this.json_data);
  }

  onDeleteForm(){
    this.formTools = [];
    this.formName = "Enter Form Name";
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      if(this.tools[event.previousIndex].name=="name"){
       // this.data['name'] = {firstname:"",lastname:""};
      }
      // const para = document.getElementById("parent");
      // if(this.tools[event.previousIndex].name=="TextField"){
      //   const element = document.createElement('input');
      //   element.setAttribute("type", "text");
      //   element.setAttribute("class","form-control");
      //   element.setAttribute("value", "TextField");
      //   element.setAttribute("cdkDrag","");
      //   para?.appendChild(element);
      // }
      // else if(this.tools[event.previousIndex].name=="Label"){
      //   const element = document.createElement('Label');
      //   element.setAttribute("class","form-label");
      //   element.innerHTML = "Label";
      //   element.setAttribute("cdkDrag","");
      //   para?.appendChild(element);
      // }
      // else if(this.tools[event.previousIndex].name=="Button"){
      //   const element = document.createElement('input');
      //   element.setAttribute("type", "button");
      //   element.setAttribute("class","btn btn-primary");
      //   element.setAttribute("value", "Label");
      //   element.setAttribute("cdkDrag","");
      //   para?.appendChild(element);
      // }
      
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

