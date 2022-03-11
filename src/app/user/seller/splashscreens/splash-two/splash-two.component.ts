import { Component, OnInit } from '@angular/core';
import{ Router} from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-splash-two',
  templateUrl: './splash-two.component.html',
  styleUrls: ['./splash-two.component.scss']
})
export class SplashTwoComponent implements OnInit {
  step2: FormGroup;
  emailPhone:string="";
  bName: string=""; 
  bCity: string=""; 

  constructor(
    public signup:RegistrationService,
    public router: Router,
    fb: FormBuilder,
    ) { 
      this.step2=fb.group({
      'city': [null, Validators.compose([Validators.required])],
    });
      
   
  }

  ngOnInit(): void {
    this.emailPhone = history.state.data.email;
    this.bName = history.state.data.bName;
    console.log(history.state.data);
  }

  submitForm() {
    this.bCity=this.step2.value.city;
    this.router.navigate(['/user/seller/splash/splashthree'], {state: {data: {email:this.emailPhone,bName:this.bName,bCity:this.bCity}}});
  }
}
