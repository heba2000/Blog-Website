import { NewUser } from 'src/app/models/newUserModel';
import { RegisteredUser } from '../models/registeredUserModel';
import { ApiService } from './api-service.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userToken:any;
  constructor(private _api:ApiService , private _http:HttpClient) { 
    this.userToken = localStorage.getItem('userToken');
  }
  postSignUp(user:NewUser){
    return this._api.post(`/signUp`, user)
  }
  postSignIn(user:RegisteredUser){
    return this._api.post(`/users/signIn`, user)
  }
  getUserDetails(){
    return this._api.getUsingToken(`/users`)
  }


  
}
