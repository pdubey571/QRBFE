import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-edit-general-details',
  templateUrl: './edit-general-details.component.html',
  styleUrls: ['./edit-general-details.component.scss']
})
export class EditGeneralDetailsComponent implements OnInit {
  form: FormGroup;
  @Output("onStoreUpdate") onStoreUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(fb: FormBuilder, private service: RestaurantService) {
    this.form = fb.group({
      //  'email': [null, Validators.compose([Validators.required, Validators.email])],
      'business_name': [null, Validators.compose([Validators.required])],
      'business_location': [null, Validators.compose([Validators.required])],
      'business_est_since': [null, Validators.compose([Validators.required])],
      'business_definition': [null, Validators.compose([Validators.required])],
      //'phone_number': [null, Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],

    });
  }

  ngOnInit(): void {
    this.service.onResDataLoad.subscribe(data => {
      let { business_name, business_location, business_est_since, business_definition } = data;
      this.form.controls['business_name'].setValue(business_name);
      this.form.controls['business_location'].setValue(business_location);
      this.form.controls['business_est_since'].setValue(business_est_since);
      this.form.controls['business_definition'].setValue(business_definition);
    })
  }

  onInput($event: any) {
    this.onStoreUpdate.emit(this.form.value);
  }
}
