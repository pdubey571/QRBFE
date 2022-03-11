import { Component, OnInit } from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { pinGenerate,validatedPinResponse,validatePin,pinGenerateResponse } from 'src/app/classes/signup'
import { NotificationService } from 'src/app/services/notification.service';

const optionsWithIcons: {name: string, icon: string}[] = [
  {'name': 'America', 'icon': 'icon001.svg'},
  {'name': 'India', 'icon': 'icon001.svg'},
  {'name': 'China', 'icon': 'icon001.svg'}
]

@Component({
  selector: 'app-splash-four',
  templateUrl: './splash-four.component.html',
  styleUrls: ['./splash-four.component.scss']
})
export class SplashFourComponent implements OnInit {
  avOptions = [
    {'id': 1, 'name': 'America', 'icon': 'icon001.svg'},
    {'id': 2, 'name': 'India', 'icon': 'icon001.svg'},
    {'id': 3, 'name': 'China', 'icon': 'icon001.svg'}
  ]
  selectedOption = this.avOptions[1].name;

  step4:FormGroup;
  emailPhone: string = "";
  bName :string = "";
  bCity: string = "";
  eYear: string = "";
  shortDesc: string ="";

  constructor(
    private notifyService: NotificationService,
    public signup:RegistrationService,
    public router: Router,
    fb: FormBuilder,
    ) { 
      this.step4=fb.group({
      'shortDesc': [null, Validators.compose([Validators.required])],
    });
      
   
  }

  ngOnInit(): void {
    this.emailPhone = history.state.data.email;
    this.bName = history.state.data.bName;
    this.bCity = history.state.data.bCity;
    this.eYear = history.state.data.eYear;
    console.log(history.state.data);
  }

  submitForm() {
    this.shortDesc=this.step4.value.shortDesc;
    this.signUpUser(); 
    this.router.navigate(['/user/seller/splash/splashfive'], {state: {data: {email:this.emailPhone,bName:this.bName,bCity:this.bCity,eYear:this.eYear,shortDesc:this.shortDesc}}});
  }

  
  signUpUser() {    
    let shortDescr='';
    if(typeof this.shortDesc!='undefined' && this.shortDesc){
      shortDescr=this.shortDesc;
    }
    let signupDetails = {email:this.emailPhone,business_name:this.bName,business_location:this.bCity,business_description:shortDescr,phone_number:this.emailPhone}
    //let signupDetails = {email:'abcde@abc.com',business_name:'Test',business_location:'delhi',business_description:'test',phone_number:'abc@abc.com'}
    
    this.signup.signupUser(signupDetails).subscribe(
      (resp)  => {
       debugger;       
       console.log(resp);
       if(resp.error == false || resp.error==='false')
        {
          localStorage.setItem('isLoggedIn', "true");  
          localStorage.setItem('id', resp.data.id); 
          localStorage.setItem('token', "1"); 
          this.notifyService.showSuccess(resp.message,"");
        }
      },
      err=>{
        debugger;
        var errMsg=err;        
        console.log(err.error.message);
        this.notifyService.showError("User already exist!","");
        //this.router.navigate(['/welcome'], {state: {data: {email:this.emailphone}}});
      }
    );    
} 
}


