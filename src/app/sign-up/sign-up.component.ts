import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegistationService } from '../user-registation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error="";
  signupForm= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.minLength(4)]),
    password: new FormControl('',[Validators.required]),
    Address: new FormGroup({
      Street: new FormControl('',[Validators.required]),
      City: new FormControl('',[Validators.required]),
      State: new FormControl('',[Validators.required]),
      Zipcode: new FormControl('',[Validators.required])
    })
  })
  constructor(private registor:UserRegistationService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.signupForm.value);
    this.registor.getRegistor({"email":this.signupForm.value.email,"password":this.signupForm.value.password})
    .subscribe((res)=>{
      console.log(res);
      this.router.navigate(["/login"])
    },
    (err)=>{
      console.log(err);
      this.error = err.error.error.message;
    })
  }

}
