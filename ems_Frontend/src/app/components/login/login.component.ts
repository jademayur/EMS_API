import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:any = {
    "email": "",
    "password": ""
  };
  http = inject(HttpClient);
  
  constructor(private router:Router){

  }
  loginForm: FormGroup = new FormGroup({
   
    email : new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required])

  })


  onLogin() {
    console.log(this.loginObj);
      debugger
    this.http.post("https://localhost:7079/api/User", this.loginObj).subscribe((res:any)=>{
      
      
      if(res.result) {
        alert("Login Success");
        localStorage.setItem("angularLogin",this.loginObj.User);
        this.router.navigateByUrl("user")
      } else {
        alert("Check User Name or Password")
      }
    })

  
  }
}
