import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
interface set {
  set: string;
  days: Array<{
    day: string,
    value: boolean
  }>
  timings: Array<{
    opening: any;
    closing: any;
  }>
}
@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.scss']
})
export class BusinessHoursComponent implements OnInit {
  timings: Array<{ value: string; label: string }> = [];

  sets: Array<set> = []
  showLoader: boolean=false;

  constructor(    
    private restServ: RestaurantService,
    private router: Router,
    private notifyService: NotificationService) {
    for (var i = 1; i <= 24; i++) {
      let t = (i <= 12 ? i : i - 12) + " " + (i < 12 || i == 24 ? "AM" : "PM");
      this.timings.push({ value: t, label: t });
      console.log(t)
    };

  }

  ngOnInit(): void {
  }
  addSet() {
    this.sets.push({
      set: "set - " + (this.sets.length + 1),
      days: [
        {
          "day": "Mon",
          "value": false
        },
        {
          "day": "Tue",
          "value": false
        },
        {
          "day": "Wed",
          "value": false
        },
        {
          "day": "Thu",
          "value": false
        },
        {
          "day": "Fri",
          "value": false
        },
        {
          "day": "Sat",
          "value": false
        },
        {
          "day": "Sun",
          "value": false
        }
      ],
      timings: []
    })
  }
  addHours(set: set) {
    set.timings.push({
      opening: {
        value:"",
        label:""
      },
      closing: {
        value:"",
        label:""
      }
    })
  }
  removeSet(index: any) {
    this.sets.splice(index, 1);
  }

  saveSet() {
    this.showLoader = false;
    this.restServ.addRestaurentSets({restaurent_id:"1", schedule_set:this.sets}).subscribe(succ => {
      this.showLoader = true;
      this.notifyService.showSuccess("Sets Updated Successfully!", "Update Profile")
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
