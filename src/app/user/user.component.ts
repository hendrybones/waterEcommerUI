import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  forUser(){
    this.userService.forUser().subscribe(
      (response: any) =>{
        console.log(response);
      },
      (error: any)=>{
        console.log(error);
      }
    );
      
  }

}
