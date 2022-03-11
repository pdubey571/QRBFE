import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import {CategoryData,CategoryResponse,Category,GenericDelete, EditCategory, addCategory} from '../classes/category'
import {CustomizationList,CustomizationParam} from '../classes/customization'


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

      // Define API
      // categorylistapiURL = 'http://18.118.86.223:3001/api/items/getCategoryList';
      // categoryByCatIdapiURL = 'http://18.118.86.223:3001/api/items/getCategoryById?catId=';  
      // editCategoryapiURL = 'http://18.118.86.223:3001/api/items/editCategory';   
      // deleteCategoryapiURL = 'http://18.118.86.223:3001/api/items/removeCategory'; 
      // customizationlistapiURL = 'http://18.118.86.223:3001/api/items/getCustmizationList'; 
      // customizationaddapiURL = 'http://18.118.86.223:3001/api/items/addNewCustmization'; 
      // customizationdeleteapiURL = 'http://18.118.86.223:3001/api/items/removeCustmization'; 
      // createNewItemapiUrl='http://18.118.86.223:3001/api/items/addNewItem';
      // addCategoryapiURL = 'http://18.118.86.223:3001/api/items/addNewCategory';   
      categorylistapiURL = 'http://localhost:3001/api/items/getCategoryList';
      categoryByCatIdapiURL = 'http://localhost:3001/api/items/getCategoryById?catId=';  
      editCategoryapiURL = 'http://localhost:3001/api/items/editCategory';   
      deleteCategoryapiURL = 'http://localhost:3001/api/items/removeCategory'; 
      customizationlistapiURL = 'http://localhost:3001/api/items/getCustmizationList'; 
      customizationaddapiURL = 'http://localhost:3001/api/items/addNewCustmization'; 
      customizationdeleteapiURL = 'http://localhost:3001/api/items/removeCustmization'; 
      createNewItemapiUrl='http://localhost:3001/api/items/addNewItem';
      addCategoryapiURL = 'http://localhost:3001/api/items/addNewCategory';   




  constructor(private http: HttpClient) { }

   // HttpClient API get() method => Get Category
   getCustomizationList(): Observable<any> {
    return this.http.get<any[]>(this.customizationlistapiURL+`?t=${Date.now()}`);
  }

  // HttpClient API post() method => add customization
  addCustomization(custmizationdata: CustomizationParam): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.customizationaddapiURL,custmizationdata,httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 
  // HttpClient API get() method => Get Category
  getAllCategory(): Observable<any> {
    return this.http.get<any[]>(this.categorylistapiURL);
  }

  // HttpClient API get() method => Get Category by CategoryID
  getCategoryByCatId(catId: string): Observable<any> {
    return this.http.get<any>(this.categoryByCatIdapiURL + catId);
  }

  // HttpClient API post() method => Update Category
  addCategory(categorydata: addCategory): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.addCategoryapiURL,categorydata,httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  // HttpClient API post() method => Update Category
  editCategory(categorydata: EditCategory): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.editCategoryapiURL,categorydata,httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  // HttpClient API post() method => Update Category
  editSubCategory(categorydata: Category): Observable<any> {
    debugger;
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.editCategoryapiURL,categorydata,httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  // HttpClient API post() method => Update Category
  deleteGeneric(generalDel: GenericDelete): Observable<any> {
    debugger;
    var apiUrl=''
    if(generalDel.type==='customization')
    {
      apiUrl=this.customizationdeleteapiURL;
    }
    if(generalDel.type==='category')
    {
      apiUrl=this.deleteCategoryapiURL;
    }
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(apiUrl,generalDel,httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  createNewMenuItem(formdata:FormData) 
  {
    debugger;
    var fdata = new FormData();
    fdata=formdata;
    
    return this.http.post(this.createNewItemapiUrl, fdata)
    
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
}
