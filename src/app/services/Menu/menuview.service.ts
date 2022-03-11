import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from 'angularx-social-login';
export class CommonFunction {
 // host = "http://18.118.86.223:3001/api/"
 host="http://localhost:3001/api/"
  constructor() {

  }
  URL(url: string) {
    return this.host + url;
  }
}
@Injectable({
  providedIn: 'root'
})
export class MenuviewService extends CommonFunction {

  constructor(private http: HttpClient) {
    super();
  }


  getList(data: { "restaurant_id": string }): Observable<any> {
    return this.http.post<any[]>(this.URL("items/getItemList"), data);
  }
  createUpdateCategory(data: { "category_name": string, "parent_category": number, "category_description": string, "status": number }): Observable<any> {
    const rq = {
      "mode": "raw",
      "raw": data
    }
    return this.http.post<any[]>(this.URL("items/addNewCategory"), rq);
  }
  removeItem(data: {"id":any}): Observable<any> {
    return this.http.post<any[]>(this.URL("items/removeItem"), data);
  }
}
