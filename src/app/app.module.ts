import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SignUpComponent } from './account/sign-up/sign-up.component';
import { UserComponent } from './user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SetPinComponent } from './account/set-pin/set-pin.component';
import { PersonalInformationComponent } from './covid-steps/personal-information/personal-information.component';
import { QrcodeComponent } from './covid-steps/qrcode/qrcode.component';
import { PaasManageComponent } from './covid-steps/paas-manage/paas-manage.component';
import { PaasListComponent } from './covid-steps/paas-list/paas-list.component';
import { PersonalAttachementsComponent } from './covid-steps/personal-attachements/personal-attachements.component';
import { InformationSubmitComponent } from './covid-steps/information-submit/information-submit.component';
import { RestaurantloginComponent } from './account/restaurantlogin/restaurantlogin.component';
import { VerifyPinComponent } from './account/verify-pin/verify-pin.component';
import { WelcomeComponent } from './account/welcome/welcome.component';
import { CustomerloginComponent } from './account/customerlogin/customerlogin.component';
import { CustomerverifypinComponent } from './account/customerverifypin/customerverifypin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';

import { SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
import { AutoTabDirective } from './auto-tab.directive';
import { UplodtestComponent } from './account/uplodtest/uplodtest.component';
import { TestuploadComponent } from './account/testupload/testupload.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SignUpComponent,
    UserComponent,
    SetPinComponent,
    PersonalInformationComponent,
    QrcodeComponent,
    PaasManageComponent,
    PaasListComponent,
    PersonalAttachementsComponent,
    InformationSubmitComponent,
    RestaurantloginComponent,
    VerifyPinComponent,
    WelcomeComponent,
    CustomerloginComponent,
    CustomerverifypinComponent,
    AutoTabDirective,
    UplodtestComponent,
    TestuploadComponent,
    //TwoDigitDecimaNumberDirective,
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgOptionHighlightModule,
    SlickCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide:"SocialAuthServiceConfig",
      useValue:{
        autoLogin:false,
        providers:[
          {
            id:GoogleLoginProvider.PROVIDER_ID,
            provider:new GoogleLoginProvider(
              '348183829885-d09bjagdokgcj6i9mjj0g4er6rohlj2f.apps.googleusercontent.com'
            )
          },
          {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider:new FacebookLoginProvider('clientId')
          }
        ]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
