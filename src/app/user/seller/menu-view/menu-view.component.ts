import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuviewService } from 'src/app/services/Menu/menuview.service';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent implements OnInit {
  thId = '';
  activeSearch: boolean = false;
  openMenu: boolean = false;

  activeTab = 'active'
  menuList: any[] = [
    {
      "title": "Non Veg",
      "param": [
        {
          "id": "2",
          "category_name": "mutton"
        },
        {
          "id": "3",
          "category_name": "chiken"
        }
      ]
    },
    {
      "title": "Veg",
      "param": [
        {
          "id": "4",
          "category_name": "Veg Burger"
        },
        {
          "id": "5",
          "category_name": "Pizza"
        }
      ]
    }
  ]

  menuListItem: any[] = [
  ]
  constructor(private router: Router, private menuviewService: MenuviewService) { }

  ngOnInit(): void {
      this.loadList();
  }
  loadList(){
       this.menuviewService.getList({ "restaurant_id": "1" })
      .subscribe(succ => {
        this.menuListItem = succ.data;

        console.log("data", this.menuListItem);
      }, err => console.log("error"));
  }
  removeItem(item:any){
    if (confirm("Are you sure want to remove this item.")) {
      this.menuviewService.removeItem({ id: item.id.toString() }).subscribe(resp => {
        this.loadList();
      }, (error: any) => {
        console.log("Error occured while removing the record.", error);
      });
    }
  }
  toggleHelper(event: any) {
    event.target.classList.toggle("active");
    event.target.parentElement.classList.toggle("active-submenu");
  }

  btnClick() {
    this.router.navigateByUrl('/user/seller/menu/menuedit');
  }

  toggleSearch() {
    this.activeSearch = !this.activeSearch;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }

  mTab(activeTab: any) {
    this.activeTab = activeTab;
  }



}
function x(x: any, arg1: (any: any) => any) {
  throw new Error('Function not implemented.');
}

