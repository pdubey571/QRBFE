import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { pinGenerate,validatedPinResponse,validatePin,pinGenerateResponse } from 'src/app/classes/signup'



@Component({
  selector: 'app-splash-one',
  templateUrl: './splash-one.component.html',
  styleUrls: ['./splash-one.component.scss']
})
export class SplashOneComponent implements OnInit {

  step1:FormGroup;
  emailPhone: string="";
  bName:string="";

  constructor(
    public signup:RegistrationService,
    public router: Router,
    fb: FormBuilder,
    ) { 
      this.step1=fb.group({
      'businessName': [null, Validators.compose([Validators.required])],
    });
      
   
  }

  ngOnInit(): void {
    this.emailPhone = history.state.data.email;
    console.log(history.state.data);
  }

  submitForm() {
    if (this.step1.valid) {
      debugger;
      this.bName=this.step1.value.businessName;
      this.router.navigate(['/user/seller/splash/splashtwo'], {state: {data: {email:this.emailPhone,bName:this.bName}}});

    }
    
  }
}
