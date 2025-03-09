import { Component, inject,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  
  userList : User[] = [];
  userService  = inject (UserService)
  userForm:FormGroup = new FormGroup({ })

constructor(private fb: FormBuilder){}

ngOnInit(): void {
  this.setFormState();
  this.getUser();
 // this.user = this.userService.getUser();  
}

openModel()
{
  const model = document.getElementById("myModal");
  if(model != null)
  {
    model.style.display = "block"
  }
}

closeModel()
{
  const model = document.getElementById("myModal");
  if(model != null)
  {
    model.style.display = "none"
  }
}
getUser()
{
  this.userService.getAllUsers().subscribe((res)=>{
    this.userList = res;
  })
}

setFormState()
{
  this.userForm = this.fb.group ({
    id:[0],
    name: ["",[Validators.required]],
    mobile: ["",[Validators.required]],
    email : ["",[Validators.required, Validators.email]],
    password:["",[Validators.required]],
    role: ["", [Validators.required]],
    
  });
}

formValues : any

onSaveUser(){
  if(this.userForm.value.id == 0)
    {
      this.formValues = this.userForm.value;
      this.userService.addUser(this.formValues).subscribe((res)=>{
        alert('User Added Successfully');
        this.getUser();
        this.userForm.reset();
        this.closeModel();
      });
    }
    else
    {
      this.formValues = this.userForm.value;
      this.userService.updateUser(this.formValues).subscribe((res)=>{
        alert('User updated Successfully');
        this.getUser();
        this.userForm.reset();
        this.closeModel();
      });
    }

}

onDelete(id:number)
  {
    const isConfirm = confirm("Are you sure you want to delete this User ")
    if(isConfirm)
    {
      this.userService.deleteUser(id).subscribe((res)=>{
        alert('User Deleted Successfully');
        this.getUser();
      });
    }   
   
  }

  onEdit(User: User)
  {
    this.openModel();
    this.userForm.patchValue(User);

  }
}
