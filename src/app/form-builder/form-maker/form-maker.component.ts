import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-form-maker',
  templateUrl: './form-maker.component.html',
  styleUrls: ['./form-maker.component.css']
})
export class FormMakerComponent implements OnChanges, OnInit {

  @Input() Json_data: any;
  hide = true;

  public myForm: FormGroup = this.fb.group({});

  constructor(public fb:FormBuilder,
    public matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
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
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("From the form maker component:- ",this.Json_data);
    this.createForm(this.Json_data.Fields);
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
