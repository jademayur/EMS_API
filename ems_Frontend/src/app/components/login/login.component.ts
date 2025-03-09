import { Component, inject , NgModule} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {  User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Get form controls for validation in HTML
  get f() {
    return this.loginForm.controls;
  }
  
  onLogin() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Dummy API endpoint (replace with actual backend API)
    const apiUrl = 'https://localhost:7079/api/User/login';
    const userData = this.loginForm.value;
    //console.log(userData);
    
    const headers = { 'Content-Type': 'application/json' };
    this.http.post(apiUrl,userData,{headers}).subscribe({
      
      next: (response: any) => {
        //alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(response));

        //this.router.navigate(['/user']); // Redirect to dashboard
        console.log(response);
        
        
        if(response.role == 'Admin')
        {
          this.router.navigate(['/user']); // Redirect to dashboard
        }  
        else
        {
          this.router.navigate(['/employee']); // Redirect to dashboard

        } 
              
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
    
  
  }
}
