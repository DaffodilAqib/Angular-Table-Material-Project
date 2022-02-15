import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  //tools = ["Label","AreaField","Radio button","Check box","Button"];
  tools = [ {name:"TextField",input_type:"text"}, {name:"Label",input_type:"Label"}, {name:"Button",input_type:"button"},{name:"name"},{name:"Address"},{name:"Email"},{name:"Password"}];
  formTools: any = [];
  model = {};
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event);
      const para = document.getElementById("parent");
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
