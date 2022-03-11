import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CommonFunction } from './Menu/menuview.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService extends CommonFunction {
  onResDataLoad: Subject<any>;
  constructor(private http: HttpClient) {
    super();
    this.onResDataLoad = new Subject<any>();
  }

  getRestaurant(id: any): Observable<any> {
    return this.http.get<any[]>(this.URL("users/getRestaurantDeails?userId=" + id));
  }
  updateRestaurantDetails(data: any): Observable<any> {
    return this.http.post<any[]>(this.URL("users/updateRestaurantDetails"), data);
  }
  addRestaurentSets(data: {"restaurent_id":string;"schedule_set":any;}): Observable<any> {
    return this.http.post<any[]>(this.URL("users/addRestaurentSets"), data);
  }
  removeItem(data: { "id": any }): Observable<any> {
    return this.http.post<any[]>(this.URL("users/removeItem"), data);
  }
  uploadImage(form:FormData){
    return this.http.post<any[]>(this.URL("users/uploadRestauratImage"), form);
  }
}
