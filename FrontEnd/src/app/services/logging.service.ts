import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  loginStatus=new BehaviorSubject<boolean>(this.isLoggedIn());
  constructor() { }

  login(token:string){
    localStorage.setItem("userToken",token);
    this.loginStatus.next(true);
  }

  logout(){
    localStorage.removeItem("userToken");
    this.loginStatus.next(false);
  }

  isLoggedIn():boolean{
    let token=localStorage.getItem("userToken");
    return token!=null;
  }

  changeLoginStatus(status:boolean)
  {
    this.loginStatus.next(status);
  }

}
