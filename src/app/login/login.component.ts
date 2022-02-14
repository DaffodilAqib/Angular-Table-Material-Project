import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  error = "";
  loginForm = new FormGroup({
    UserName: new FormControl('',[Validators.required,Validators.minLength(4)]),
    Password: new FormControl('',[Validators.required])
  })

  onSign=true;
  onSign_in(){
    this.onSign=true;
  }
  onSign_up(){
    this.onSign=false;
  }
  constructor(private auth: AuthServiceService, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    if(this.auth.getAutoLogin()){
      this.router.navigate(["home"]);
    }
  }
  onChanges(){
    this.error="";
  }
  onSubmit(){
    console.log(this.loginForm.value);
    console.log(environment.firebase_Token);
    this.auth.getAuthication({"email":this.loginForm.value.UserName,"password":this.loginForm.value.Password})
    .subscribe((res:any)=>{
      console.log(res.idToken);
      this.auth.setToLocal(res.idToken);
      this.router.navigate(["home"]);
      },
      (err)=>{
        console.log(err.error.error);
        this.error = err.error.error.message;
      }
      );

  }

}
