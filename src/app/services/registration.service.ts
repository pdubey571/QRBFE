import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import {Signup, pinGenerateResponse, pinGenerate,validatePin,validatedPinResponse} from '../classes/signup'
import { environment } from 'src/environments/environment';
import { SocialAuthService } from 'angularx-social-login';
import { NotificationService } from 'src/app/services/notification.service'


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    // Define API
    // signupapiURL = 'http://18.118.86.223:3001/api/users/signup';
    // generatepinapiURL = 'http://18.118.86.223:3001/api/users/generatePin';
    // validatepinapiURL = 'http://18.118.86.223:3001/api/users/validatePin';
    // categoryListapiUrl='http://18.118.86.223:3001/api/items/getCategoryList';
    // uploadWelcomeImage='http://18.118.86.223:3001/api/users/uploadRestauratWelcomeAsset';

    signupapiURL = 'http://localhost:3001/api/users/signup';
    generatepinapiURL = 'http://localhost:3001/api/users/generatePin';
    validatepinapiURL = 'http://localhost:3001/api/users/validatePin';
    categoryListapiUrl='http://localhost:3001/api/items/getCategoryList';
    uploadWelcomeImage='http://localhost:3001/api/users/uploadRestauratWelcomeAsset';


    constructor(
      private http: HttpClient,
      private socialAuthService:SocialAuthService,
      private notifyService : NotificationService,
      ) { }
  
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

   
  
    // HttpClient API get() method => Fetch Category
    getCategory(): Observable<any> {
      return this.http.get<any>(this.categoryListapiUrl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }  

    // HttpClient API post() method => Generate Pin  
    generatePin(emailPhone: pinGenerate): Observable<any> {
      debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<any>(this.generatepinapiURL,emailPhone,httpOptions)      
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }   

    // HttpClient API post() method => Validate Pin  
    validatePin(validPin: validatePin): Observable<validatedPinResponse> {
      debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<validatedPinResponse>(this.validatepinapiURL,validPin,httpOptions);
      /*
      .pipe(
        retry(0),
        catchError(this.handleError)
      )*/
    }

    // HttpClient API post() method =>Sinup User  
    signupUser(signupData: Signup): Observable<any> {
      debugger;
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post<any>(this.signupapiURL,signupData,httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
    }

    uploadWelcomeImageVideo(formdata:FormData): boolean
    {
      let result:boolean=false;
      var fdata = new FormData();
      fdata=formdata;
      debugger;
      this.http.post(this.uploadWelcomeImage, fdata)
      .subscribe(res => {
        console.log(res);
        this.notifyService.showSuccess('Uploaded Successfully.','');
        //alert('Uploaded Successfully.');
        result= true;
      },
      (error) => console.log(error))
      return result;
    }

  createNewUser(user: pinGenerate): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json;'}) };
    return this.http.post<any>(environment.genpinapiURL, user, httpOptions);
    
  }
  // HttpClient API post() method => Create user
  createUser(userData:any): Observable<any> {
    return this.http.post<any>(this.generatepinapiURL, JSON.stringify(userData), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  


  handleError(error: { error: { message: string; }; status: any; message: any; }) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

  googleSignIn(id_token:any)
  {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`,
    { postBody:`id_token=${id_token}&providerId=google.com`,
      requestUri:'http://localhost:4200',
      returnIdpCredential:true,
      returnSecureToken:true
    })
  }
 
  
}