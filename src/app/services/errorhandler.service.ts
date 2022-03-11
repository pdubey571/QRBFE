import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  errorMessages={
    UNKNOWN: 'An unknown error is occurred',
    //[Incorrect Otp]: 'Incorrect pin entered' 
  }

  constructor() { }
}
