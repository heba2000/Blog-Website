import { LoggingService } from './../../services/logging.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;  
  constructor(private _router:Router , private _logService:LoggingService) { }

  ngOnInit(): void {
    this._logService.loginStatus.subscribe( 
      status => {
      this.isLogged = status;
    });
   
  } 
  
signOut(){
  this._logService.logout();
  this._router.navigate(['/'])
}

}
