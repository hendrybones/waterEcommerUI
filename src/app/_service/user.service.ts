import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API ='http://localhost:8081';

  requestHeader = new HttpHeaders(
    {"No-Auth":"true"}
  )

  constructor(private HttpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  public login(loginData: any){
    return this.HttpClient.post(this.PATH_OF_API + "/authenticate",loginData,{headers: this.requestHeader})
  }

  public forUser(){
    return this.HttpClient.get(this.PATH_OF_API +'/forUser', {responseType: "text"});
  }

  public forAdmin(){
    return this.HttpClient.get(this.PATH_OF_API +'/forAdmin', {responseType: "text"});
  }

  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
            
          } else {
            return isMatch;
          }
        }
      }
    }


  }
}
