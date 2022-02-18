import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { FormDataService } from '../form-data.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-form-maker',
  templateUrl: './form-maker.component.html',
  styleUrls: ['./form-maker.component.css']
})
export class FormMakerComponent implements OnChanges, OnInit {

  
  hide = true;
  Json_data: any;
  public myForm: FormGroup = this.fb.group({});

  constructor(public fb:FormBuilder,
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public activeRouter:ActivatedRoute,
    public formData: FormDataService,
    private location:Location
    ) { }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      "visibility_off",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/eye-slash-solid.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "visibility",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/eye-solid.svg")
    );
    console.log("Using Location Method :-",this.location.getState());
    let data:any = this.location.getState();
    this.Json_data = data.json; 
    this.createForm(this.Json_data.Fields);
    // this.formData.Data$
    // .subscribe((res:any)=>{
    //   this.Json_data = res;
    //   console.log("From the form maker component:- ", this.Json_data);
    // this.createForm(this.Json_data.Fields);
    // })
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  createForm(fields:any){
    for(let field of fields){
      this.myForm.addControl(field.name,this.fb.control(field.value));
    }
  }
  onSubmit(){
    console.log("Form is :-", this.myForm.value);
  }
}
