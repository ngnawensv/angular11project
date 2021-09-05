import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //uri:string="http://localhost:8081/users"
  constructor( private http:HttpClient) { }

  addUser(user:User){
    return this.http.post("http://localhost:8081/users/create",user);
  }

  findUserByEmail(email:any) {
    return this.http.get("http://localhost:8081/users/email/"+email);
  }
}
