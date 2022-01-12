import { LoggingService } from './../../services/logging.service';
import { UserServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisteredUser } from 'src/app/models/registeredUserModel';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _userService: UserServiceService 
    , private _logService:LoggingService) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    })
  }
  redirectToSignUp() {
    this._router.navigate(['/sign-up']);
  }
  signInResponse: any;
  signInUser() {
    let registerdUser: RegisteredUser = new RegisteredUser(this.signInForm.value);
    this._userService.postSignIn(registerdUser).subscribe(
      (response: any) => {
          this.signInResponse = response;
          console.log(response)
      },
      (error) => { console.log(error.message) },
      () => {
          this._logService.login(this.signInResponse.userToken)
          this._router.navigate(['/home']);
      }
    )

  }
}
