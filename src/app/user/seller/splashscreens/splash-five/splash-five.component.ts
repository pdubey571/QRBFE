import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from 'src/app/services/registration.service';
import { ErrorhandlerService } from 'src/app/services/errorhandler.service';
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-splash-five',
  templateUrl: './splash-five.component.html',
  styleUrls: ['./splash-five.component.scss']
})
export class SplashFiveComponent implements OnInit {
  constructor(
    public fb: FormBuilder,private http: HttpClient,
    private notifyService : NotificationService,
    private errorHandler :ErrorhandlerService,
    public signup:RegistrationService,
    private router:Router) {   
  }

 
  url:any;
  format:any;
  selectedFile: any;
  //form: FormGroup;

  form = new FormGroup({
    //user_id: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    welcome_asset: new FormControl('', [Validators.required])
  });

  get f(){
    return this.form.controls;
  }

  onSelectFile(event:any) {
    debugger;
    const file = event.target.files && event.target.files[0];
    this.selectedFile=event.target.files && event.target.files[0];
    if (file) {         
      
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.form.patchValue({
          fileSource: reader.result
        });
      }
    }
  }

  submitForm() {        
    console.log(this.form.value);

    var formData: any = new FormData();
    formData.append("user_id", "1");
    formData.append("welcome_asset", this.selectedFile);
    debugger;
    this.signup.uploadWelcomeImageVideo(formData);
    this.router.navigateByUrl('/user/seller/congratulations');
    
    /*
    this.http.post('http://18.118.86.223:3001/api/users/uploadRestauratWelcomeAsset', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
      */

    //var formData: any = new FormData();    
    //formData.append("avatar",this.);

    /*
    this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
    (response) => console.log(response),
    (error) => console.log(error)
    )
    this.router.navigate(['/user/seller/splash/splashfive'], {state: {data: {email:this.emailPhone,bName:this.bName,bCity:this.bCity,eYear:this.eYear,shortDesc:this.shortDesc}}});
    */
  }

  ngOnInit(): void {
  console.log(history.state.data);
 
  }

}
