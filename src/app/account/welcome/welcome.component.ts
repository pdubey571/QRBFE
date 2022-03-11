import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  emailPhone: string="";
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.emailPhone = history.state.data.email;
    setTimeout(() => {
      this.router.navigate(['/user/seller'], {state: {data: {email:this.emailPhone}}});   
      //this.router.navigateByUrl('/user/seller');
  }, 2000);  //5s    
  }

  btnClick()
  {
      this.router.navigateByUrl('/user/seller');
  }  
}
