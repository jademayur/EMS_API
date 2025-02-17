import { Component, inject,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employeeList : Employee[] = [];
  empService  = inject (EmployeeService)
  empForm:FormGroup = new FormGroup({ })

constructor(private fb: FormBuilder){}

ngOnInit(): void {
  this.setFormState();
  this.getEmployees();
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
getEmployees()
{
  this.empService.getAllEmployees().subscribe((res)=>{
    this.employeeList = res;
  })
}

setFormState()
{
  this.empForm = this.fb.group ({
    id:[0],
    name: ["",[Validators.required]],
    contactno: ["",[Validators.required]],
    email : ["",[Validators.required, Validators.email]],
    dept: ["", [Validators.required]],
    gender : ["",[Validators.required]]
  });
}

formValues : any

onSaveEmp(){
  if(this.empForm.value.id == 0)
    {
      this.formValues = this.empForm.value;
      this.empService.addEmployee(this.formValues).subscribe((res)=>{
        alert('Employee Added Successfully');
        this.getEmployees();
        this.empForm.reset();
        this.closeModel();
      });
    }
    else
    {
      this.formValues = this.empForm.value;
      this.empService.updateEmployee(this.formValues).subscribe((res)=>{
        alert('Employee updated Successfully');
        this.getEmployees();
        this.empForm.reset();
        this.closeModel();
      });
    }

}

onDelete(id:number)
  {
    const isConfirm = confirm("Are you sure you want to delete this Employee ")
    if(isConfirm)
    {
      this.empService.deleteEmployee(id).subscribe((res)=>{
        alert('Employee Deleted Successfully');
        this.getEmployees();
      });
    }   
   
  }

  onEdit(Employee: Employee)
  {
    this.openModel();
    this.empForm.patchValue(Employee);

  }

}
