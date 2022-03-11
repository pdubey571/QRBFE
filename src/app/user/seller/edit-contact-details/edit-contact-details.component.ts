import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-edit-contact-details',
  templateUrl: './edit-contact-details.component.html',
  styleUrls: ['./edit-contact-details.component.scss']
})
export class EditContactDetailsComponent implements OnInit {

  form: FormGroup;
  @Output("onStoreUpdate") onStoreUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(fb: FormBuilder, private service: RestaurantService) {
    this.form = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'business_shortdescription': [null, Validators.compose([Validators.required])],
      'business_address': [null, Validators.compose([Validators.required])],
      'website': [null, Validators.compose([Validators.required])],
      'phone_number': [null, Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])]
    });
  }

  ngOnInit(): void {
    this.service.onResDataLoad.subscribe(data => {
      let { email, business_description, business_location, website,phone_number } = data;
      this.form.controls['email'].setValue(email);
      this.form.controls['business_shortdescription'].setValue(business_description);
      this.form.controls['business_address'].setValue(business_location);
      this.form.controls['website'].setValue(website);
      this.form.controls['phone_number'].setValue(phone_number);
    })
  }

  onInput($event: any) {
    let params={
      'email':    this.form.controls['email'].value,
      'business_description': this.form.controls['business_shortdescription'].value,
      'business_location':  this.form.controls['business_address'].value,
      'website': this.form.controls['website'].value,
      'phone_number': this.form.controls['phone_number'].value
    }
    this.onStoreUpdate.emit(params);
  }
}
