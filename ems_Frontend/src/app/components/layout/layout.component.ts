import { Component,inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  user: any;
 userService  = inject (UserService)
 constructor(private router: Router){}
 
  ngOnInit(): void {
   
    this.user = this.userService.getUser();  
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    
  }

}
