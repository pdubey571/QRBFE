import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  activeSearch: boolean = false;
  openMenu: boolean = false;
  store: any;
  showLoader: boolean = false;

  constructor(
    private restServ: RestaurantService,
    private router: Router,
    private notifyService: NotificationService) {
    this.loadRestaurantDetails();
  }
  loadRestaurantDetails() {
    this.store = { ...this.store, ...{ id: 1 } }
    this.restServ.getRestaurant(this.store.id).subscribe(succ => {
      this.store = this.store = { ...succ.data, ...{ id: 1 } };
      console.log("store", this.store)
    });
  }
  ngOnInit(): void {
  }

  toggleSearch() {
    this.activeSearch = !this.activeSearch;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }
  uploadImage($event:any) {
    debugger
    let formData = new FormData();
    formData.append("restaurant_image",$event.target.files[0]);
    formData.append("restaurant_id","1");
    this.restServ.uploadImage(formData).subscribe(succ=>{
      this.notifyService.showSuccess("Uploaded Successfully!","");
      this.loadRestaurantDetails();
    },err=>{
      this.notifyService.showError("Failed to upload!","");
    }
    );
  }
  renderImage(image:any){
    return (image+"").replace("localhost","localhost:3001");
  }

}
