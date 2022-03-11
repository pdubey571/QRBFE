import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration.service';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { pinGenerate,validatedPinResponse,validatePin,pinGenerateResponse } from 'src/app/classes/signup'


@Component({
  selector: 'app-splash-three',
  templateUrl: './splash-three.component.html',
  styleUrls: ['./splash-three.component.scss']
})
export class SplashThreeComponent implements OnInit {
  // @ViewChild('dp') dp: NgbDatepicker | undefined;
  modelDate: NgbDateStruct | undefined;
  isActive: boolean = false;
  step3: FormGroup;  
  emailPhone:string="";
  bName: string="";
  bCity: string="";
  eYear: string="";

  constructor(
    public signup:RegistrationService,
    public router: Router,
    fb: FormBuilder,
    ) 
    { 
      this.step3=fb.group({
      'year': [null, Validators.compose([Validators.required])],
    });
  }
  ngOnInit(): void {    
    this.emailPhone = history.state.data.email;
    this.bName = history.state.data.bName;
    this.bCity = history.state.data.bCity;
    console.log(history.state.data);
  }

  keyPressNumbers(event:any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  toggleClass(){
    this.isActive = !this.isActive;
  }

  submitForm() {
    debugger;
    this.eYear=this.step3.value.year;
    this.router.navigate(['/user/seller/splash/splashfour'], {state: {data: {email:this.emailPhone,bName:this.bName,bCity:this.bCity,eYear:this.eYear}}});
  }
}
