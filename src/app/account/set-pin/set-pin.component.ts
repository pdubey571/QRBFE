import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-set-pin',
  templateUrl: './set-pin.component.html',
  styleUrls: ['./set-pin.component.scss']
})
export class SetPinComponent implements OnInit {  
  constructor(
    public router: Router,
    fb: FormBuilder) {
      
     }

  ngOnInit(): void {
  }
  btnClick() {
    this.router.navigateByUrl('/user/seller/splash/splashone');
  }
}
