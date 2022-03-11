import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-testupload',
  templateUrl: './testupload.component.html',
  styleUrls: ['./testupload.component.scss']
})
export class TestuploadComponent implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: [''],
      avatar: [null]
    })
  }

  ngOnInit() { }

  uploadFile(event:any) {
    debugger;
    //const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      //avatar: file
    });
    //this.form.get('avatar').updateValueAndValidity()
  }

  submitForm() {

    var formData: any = new FormData();
    formData.append("user_id", 1);
    //formData.append("welcome_asset", this.form.get('avatar').value);
    console.log(formData);
    debugger;
    this.http.post('http://18.118.86.223:3001/api/users/uploadRestauratWelcomeAsset', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

}
