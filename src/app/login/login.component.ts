import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  error = "";
  loginForm = new FormGroup({
    UserName: new FormControl('',[Validators.required,Validators.minLength(4)]),
    Password: new FormControl('',[Validators.required])
  })

  // @ViewChild("username") username:ElementRef | undefined;
  // @ViewChild("password") password:ElementRef | undefined;
  constructor(private auth: AuthServiceService, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
      this.error = "";
      console.log(changes);
      // console.log(this.username);
      // console.log(this.password);
  }
  onChanges(){
    this.error="";
  }
  onSubmit(){
    console.log(this.loginForm.value);
    
    this.auth.getAuthication({"email":this.loginForm.value.UserName,"password":this.loginForm.value.Password})
    .subscribe((res:any)=>{
      console.log(res.idToken);
      this.auth.user.next(res.idToken);
      this.router.navigate(["/side-nav"]);
      },
      (err)=>{
        console.log(err.error.error);
        this.error = err.error.error.message;
      }
      );

  }

}
