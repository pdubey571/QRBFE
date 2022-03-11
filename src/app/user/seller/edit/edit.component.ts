import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  active = 1;
  activeTab = "general";
  store: any;
  showLoader: boolean = false;

  constructor(
    private restServ: RestaurantService,
    private router: Router,
    private notifyService: NotificationService) {
  }

  ngOnInit(): void {
    this.loadRestaurantDetails()
  }

  tabSwitch(currentVal: string) {
    this.activeTab = currentVal;
  }
  onStoreUpdate(tab: any, modal: any) {
    this.store = { ...this.store, ...modal };
    Object.keys(this.store).map(x => this.store[x] = this.store[x] ? (this.store[x] + "").trim() : null);
    console.log("store:", this.store);
  }
  loadRestaurantDetails() {
    this.store = { ...this.store, ...{ id: 1 } }
    this.restServ.getRestaurant(this.store.id).subscribe(succ => {
      this.store = this.store = { ...succ.data, ...{ id: 1 } };
      this.restServ.onResDataLoad.next(this.store);
      console.log("store", this.store)
    });
  }
  SaveProfile() {
    debugger;
    let errors = [];
    this.showLoader = false;
    this.restServ.updateRestaurantDetails(this.store).subscribe(succ => {
      this.showLoader = true;
      this.notifyService.showSuccess("Profile Updated Successfully!", "Update Profile")
      setTimeout(() => this.router.navigateByUrl("/user/seller/info"), 1000);

    },
      error => {
        this.notifyService.showError("Oops! Something went wrong please try again.", "Update Profile")
        console.log("Error occured while updating the restaurant details.", error);
        this.showLoader = false;
      })
  }
  goBack(){
    window.history.back();
  }

}
