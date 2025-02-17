import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UserComponent } from './components/user/user.component';
import { EmployeeComponent } from './components/employee/employee.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'user',
                component:UserComponent
            },
            {
                path:"employee",
                component:EmployeeComponent
            }
        ]
    }
];
