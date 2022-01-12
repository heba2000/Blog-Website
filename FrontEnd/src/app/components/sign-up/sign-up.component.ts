import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/models/newUserModel';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
signUpForm:FormGroup = new FormGroup({});
newUser :NewUser = new NewUser(); 
errorMessage:string = "";

  constructor(private _formBuilder:FormBuilder , private _router:Router , private _userService:UserServiceService) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      firstName:['', [Validators.required ,Validators.pattern(/^[a-zA-Z]{3,}$/), Validators.minLength(3) , Validators.maxLength(12)]],
      lastName:['', [Validators.required ,Validators.pattern(/^[a-zA-Z]{3,}$$/), Validators.minLength(3) , Validators.maxLength(12)]],
      userName:['',[Validators.required]] ,
      email:['',[Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]], 
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(15)]] 
    })

  }
  registerNewUser(){
   let newUser = new NewUser(this.signUpForm.value)
   console.log(newUser)
   this._userService.postSignUp(newUser).subscribe(
     (response:any) => { 
       console.log(response.Data)
      } , 
     (error) => {console.log(error)},
     ()=> { this._router.navigate(['/sign-in']); }
   )
  
  }

  redirectToSignIn (){
    this._router.navigate(['/sign-in']);
  }
}
