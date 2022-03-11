import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetPinComponent } from './account/set-pin/set-pin.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { InformationSubmitComponent } from './covid-steps/information-submit/information-submit.component';
import { PaasListComponent } from './covid-steps/paas-list/paas-list.component';
import { PaasManageComponent } from './covid-steps/paas-manage/paas-manage.component';
import { PersonalAttachementsComponent } from './covid-steps/personal-attachements/personal-attachements.component';
import { PersonalInformationComponent } from './covid-steps/personal-information/personal-information.component';
import { QrcodeComponent } from './covid-steps/qrcode/qrcode.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { RestaurantloginComponent } from './account/restaurantlogin/restaurantlogin.component';
import { VerifyPinComponent } from './account/verify-pin/verify-pin.component';
import { WelcomeComponent } from './account/welcome/welcome.component';
import { CustomerloginComponent } from './account/customerlogin/customerlogin.component';
import { CustomerverifypinComponent } from './account/customerverifypin/customerverifypin.component';

import {BusinessHoursComponent} from './user/seller/business-hours/business-hours.component';
import {CovidPassComponent} from './user/seller/covid-pass/covid-pass.component';
import {EditComponent} from './user/seller/edit/edit.component';
import {EditContactDetailsComponent} from './user/seller/edit-contact-details/edit-contact-details.component';

import {InfoComponent} from './user/seller/info/info.component';
import {MenuEditComponent} from './user/seller/menu-edit/menu-edit.component';
import {MenuViewComponent} from './user/seller/menu-view/menu-view.component';
import {ProfileComponent} from './user/seller/profile/profile.component';
import {ViewComponent} from './user/seller/view/view.component';
import {ViewInfoComponent} from './user/seller/view-info/view-info.component'

import {PreLoginResturantListComponent} from './user/buyer/pre-login-resturant-list/pre-login-resturant-list.component'
import {UplodtestComponent} from './account/uplodtest/uplodtest.component';









const routes: Routes = [
  {path: '', redirectTo: 'restaurantlogin', pathMatch: 'full'},
  {path:'restaurantlogin', component: RestaurantloginComponent},
  {path:'customerlogin', component: CustomerloginComponent},
  {path:'customerverifypin', component: CustomerverifypinComponent},
  {path:'verifypin', component: VerifyPinComponent},
  {path:'welcome', component: WelcomeComponent},
  {path:'uploadtest', component: UplodtestComponent},
  
  {path:'signup', component: SignUpComponent},
  {path:'set-pin', component: SetPinComponent},
  {path:'user', component: UserComponent, 
    children: [
      {
        path: '',
        redirectTo: 'buyer',
        pathMatch: 'full'
      },
      {path: 'seller', loadChildren: () => import("./user/seller/seller.module").then(m=> m.SellerModule)},
      {path: 'buyer', loadChildren: () => import("./user/buyer/buyer.module").then(m=> m.BuyerModule)},
    ],
  },
  {path:'personal-information', component: PersonalInformationComponent},
  {path:'qrcode', component: QrcodeComponent},
  {path:'personal-attachements', component: PersonalAttachementsComponent},
  {path:'information-submit', component: InformationSubmitComponent},
  {path:'paas-manage', component: PaasManageComponent},
  {path:'paas-list', component: PaasListComponent},

  {path:'BusinessHours', component: BusinessHoursComponent},
  {path:'CovidPass', component: CovidPassComponent},
  {path:'Edit', component: EditComponent},
  {path:'EditContactDetails', component: EditContactDetailsComponent},
  {path:'MenuEdit', component: MenuEditComponent},
  {path:'MenuView', component: MenuViewComponent},
  {path:'Profile', component: ProfileComponent},
  {path:'View', component: ViewComponent},
  {path:'ViewInfo', component: ViewInfoComponent},


  {path:'PreLoginResturantList', component: PreLoginResturantListComponent},










  {path: '**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
