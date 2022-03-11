import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuviewService } from 'src/app/services/Menu/menuview.service';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  handleKeyDown(event: ScrollBehavior) {
    // this.counter++;
    let cards = document.querySelectorAll(".accordion .card");
    cards.forEach((el) => {
      let found=this.isInViewport(el);
      if(found){
        console.log("found",el)
        return false;
      }
      return true;
    })
   // console.log("scrolling")
  }
  isInViewport(el: any) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
  }
  constructor(private router: Router, private menuviewService: MenuviewService) { }
  thId = '';
  activeSearch: boolean = false;
  openMenu: boolean = false;
  menuListItem: any[] = [
  ]
  ngOnInit(): void {
    this.loadList()
  }

  toggleHelper(event: any) {
    event.target.classList.toggle("active");
    event.target.parentElement.classList.toggle("active-submenu");
  }

  btnClick() {
    this.router.navigateByUrl('/user/seller/menu/menuedit');
  }

  slides = [
    { img: "./assets/images/gallery001.jpg" },
    { img: "./assets/images/gallery002.jpg" },
    { img: "./assets/images/gallery003.jpg" },
    { img: "./assets/images/gallery004.jpg" }
  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true
  };

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log(e);

  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    // console.log(e.currentSlide)
    // if(e.currentSlide != 0) {
    //   e.event.target.parentElement.parentElement.parentElement.classList.add('hideTumb');
    // }else {
    //   e.event.target.parentElement.parentElement.parentElement.classList.remove('hideTumb');
    // }
  }

  beforeChange(e: any) {
    console.log(e.currentSlide)
  }

  toggleSearch() {
    this.activeSearch = !this.activeSearch;
  }

  toggleMenu() {
    this.openMenu = !this.openMenu;
  }
  loadList() {
    this.menuviewService.getList({ "restaurant_id": "1" })
      .subscribe(succ => {
        this.menuListItem = succ.data;
      }, err => console.log("error"));
  }
  renderImage(image: any) {
    return (image + "").replace("localhost", "localhost:3001");
  }

}

