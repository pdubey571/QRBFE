import { Component, ErrorHandler, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { pinGenerate,validatedPinResponse,validatePin,pinGenerateResponse } from 'src/app/classes/signup'

import { StateService, State } from 'src/app/state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorhandlerService } from 'src/app/services/errorhandler.service';
import { NotificationService } from 'src/app/services/notification.service'
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';  


@Component({
  selector: 'app-restaurantlogin',
  templateUrl: './restaurantlogin.component.html',
  styleUrls: ['./restaurantlogin.component.scss']
})
export class RestaurantloginComponent implements OnInit {

  login_form: FormGroup;  
  appErrMsg:any;
    constructor(
      private socialAuthService:SocialAuthService,
      private notifyService : NotificationService,
      private errorHandler :ErrorhandlerService,
      public signup:RegistrationService,
      public router: Router,
      fb: FormBuilder,
      private authService: AuthService 
    )  {  

    this.login_form = fb.group({
      'emailPhone': [null, Validators.compose([Validators.required, Validators.pattern(/^(\+\d{12}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],      
      //'emailPhone': [null, Validators.compose([Validators.required, Validators.pattern(/^(\+\d{11}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],                 
      //'emailPhone': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],      
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }  
 
 
  submitForm() {    
    debugger;

    this.markFormTouched(this.login_form);
    if (this.login_form.valid) {
      var emPhone=this.login_form.value.emailPhone;      
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

      if(format.test(emPhone)){
        debugger;   
      } else {
        debugger;        
       //emPhone='+91'+ emPhone;
      }
      
      this.generateValidPin(emPhone);
      this.router.navigate(['/verifypin'], {state: {data: {email:emPhone}}});
    } else {
      this.login_form.get('emailphone')?.markAsTouched();
      
    }
    //this.router.navigateByUrl('/verifypin');
    //this.router.navigate(['/verifypin'], {state: {data: {email:'abc@abc.com'}}});
  };

    markFormTouched(group: FormGroup | FormArray):void {
  
  };

  generateValidPin(emPhone:string) {
    var genPin = { email: emPhone}
    this.signup.generatePin(genPin).subscribe((data) => {
      debugger;      
      var resp = data; 
      debugger; 
      if(resp.error==false)
      {
        this.notifyService.showSuccess(resp.message,""); 
        this.router.navigate(['/verifypin'], {state: {data: {email:emPhone}}});       
      }  
    },
    err=>{
      debugger;
      var errMsg=err;
      this.notifyService.showError(errMsg,"");
    }    
    )
  }
  
  loginWithGoogle()
  {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }
}