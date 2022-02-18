import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, fromEvent, Subject } from 'rxjs';
import { FormDataService } from './form-data.service';
import { FormNameComponent } from './form-name/form-name.component';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  //tools = ["Label","AreaField","Radio button","Check box","Button"];
  numLabel = 1;
  numTextField = 1;
  TREE_DATA = [{
    name: "TextField",
    children: [{ name: "text" },
    { name: "number" },
    { name: "email" },
    { name: "password" }]
  }]
  tools = [{ name: "TextField", number: 1 }, { name: "Label", number: 1, visibility: true, fields: { labelname: "" } }, { name: "Button", input_type: "button" }, { name: "name" }, { name: "Address" }, { name: "Email" }, { name: "Password" }];
  formTools: any = [];
  hide = true;
  data: object = [];
  json_data: any = {}
  formName = "Enter Form Name";
  formId = "";


  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  // vis_form_name = true;

  // @ViewChild('FormName') FormName:ElementRef | any

  constructor(
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    public formData: FormDataService
  ) {
    this.dataSource.data = this.TREE_DATA;
  }

  hasChild = (a: number, node: any) =>{ 
    return !!node.children && node.children.length > 0;
  }

  changeFormName() {
    // this.vis_form_name = false;
    const dialogRef = this.dialog.open(FormNameComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
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

    this.matIconRegistry.addSvgIcon(
      "check",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/circle-check-solid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "clear",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/circle-xmark-solid.svg")
    );


  }

  editLabel(index: number, num: number, value: any) {
    console.log(num);
    console.log("value of Label", value);
    this.formTools[index].fields.labelname = value;
    this.formTools[index].visibility = !this.formTools[index].visibility;
  }
  // displayName(){
  //   console.log(this.FormName.nativeElement.value);
  //   let keyups = fromEvent(this.FormName?.nativeElement, "keyup");
  //   keyups.subscribe(data=>{console.log("Data from input",data)})
  // }

  onSubmit() {
    console.log("model:-", this.data);
    this.json_data["FormName"] = this.formName;
    this.json_data["FormId"] = Math.random().toString(36).substr(2, 9);
    this.json_data["Fields"] = [];
    for (let i = 0; i < this.formTools.length; i++) {
      // console.log(this.formTools[i]);
      if (this.formTools[i].name == "name") {
        this.json_data.Fields.push({ "type": "input", "name": "firstName", "label": "First Name", "value": "", "subtype": "text", "validators": {} });
        this.json_data.Fields.push({ "type": "input", "name": "lastName", "label": "Last Name", "value": "", "subtype": "text", "validators": {} })
      }
      else if (this.formTools[i].name == "Address") {
        this.json_data.Fields.push({ "type": "input", "name": "street", "label": "Street", "value": "", "subtype": "text", "validators": {} });
        this.json_data.Fields.push({ "type": "input", "name": "city", "label": "City", "value": "", "subtype": "text", "validators": {} });
        this.json_data.Fields.push({ "type": "input", "name": "state", "label": "State", "value": "", "subtype": "text", "validators": {} });
        this.json_data.Fields.push({ "type": "input", "name": "zipcode", "label": "Zipcode", "value": "", "subtype": "number", "validators": {} });
      }
      else if (this.formTools[i].name == "Email") {
        this.json_data.Fields.push({ "type": "input", "name": "email", "label": "Email", "value": "", "subtype": "email", "validators": {} })
      }
      else if (this.formTools[i].name == "Password") {
        this.json_data.Fields.push({ "type": "input", "name": "password", "label": "Password", "value": "", "subtype": "password", "validators": {} })
      }
      else if (this.formTools[i].name == "Label") {
        this.json_data.Fields.push({ "type": "label", "name": this.formTools[i].fields.labelname });
      }

    }
    console.log("Final json :-", this.json_data);
    // this.formData.Data$.next(this.json_data);
    this.formData.saveData(this.json_data);
  }

  onDeleteForm() {
    this.formTools = [];
    this.formName = "Enter Form Name";
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      if (this.tools[event.previousIndex].name == "Label") {
        this.numLabel += 1;
        // this.data['name'] = {firstname:"",lastname:""};
      }
      if (this.tools[event.previousIndex].name == "TextField") {
        this.numTextField += 1;
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
      console.log("event.previousContainer.data:-", event.previousContainer.data);
      console.log("event.container.data:-", event.container.data);

      this.formTools.push(JSON.parse(JSON.stringify(this.tools[event.previousIndex])));
      let num: any = this.tools[event.previousIndex].number;
      this.tools[event.previousIndex].number = 1 + num;
      // copyArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
    }
  }
}

