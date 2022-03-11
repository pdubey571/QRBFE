import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';
import { ErrorhandlerService } from 'src/app/services/errorhandler.service';
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.scss']
})
export class VerifyPinComponent implements OnInit {
  errMsg = this.errorHandler.errorMessages;
  appErrMsg: any;

  pin_form: FormGroup;
  emailphone: string = "";

  constructor(
    private notifyService: NotificationService,
    public signup: RegistrationService,
    public router: Router,
    private errorHandler: ErrorhandlerService,
    fb: FormBuilder) {
    this.pin_form = fb.group({
      'pin1': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'pin2': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'pin3': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
      'pin4': [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
  }

  ngOnInit(): void {
    this.emailphone = history.state.data.email;
    console.log(this.emailphone);
  }

  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }



  btnVerifyClick(pType: any): void {
    if (this.pin_form.valid) {
      debugger;
      var pinno = this.pin_form.value.pin1 + this.pin_form.value.pin2 + this.pin_form.value.pin3 + this.pin_form.value.pin4;
      this.validateValidPin(pinno);

    }

  }

  validateValidPin(pinno: string) {
    var validPin = { email: this.emailphone, pin: pinno }
    this.signup.validatePin(validPin).subscribe((data) => {
   
      var resp = data;
      if (resp.error == false) {
        this.notifyService.showSuccess(resp.message, "");
        if (resp.data && resp.data.email != '') {
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('id', String(resp.data.id));
          localStorage.setItem('token', "1");
          this.router.navigateByUrl('MenuView');

        } else {
          this.router.navigate(['/welcome'], { state: { data: { email: this.emailphone } } });
        }
      }
    },
      err => {
      
        var errMsg = err;
        this.appErrMsg = err.error.message;
        console.log(this.appErrMsg);
        
      }
    )
  }
  goTo($event?: any, index?: any) {
    if ($event.target.value) {
      let control: any = document.querySelector('[formcontrolname="pin' + index + '"]');
      if (control) control.focus();
    }
  }
}
