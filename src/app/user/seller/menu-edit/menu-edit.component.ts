import { Component, OnInit } from '@angular/core';
import { CustomizationList } from 'src/app/classes/customization';
import { MenuForm } from 'src/app/classes/category'
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ErrorhandlerService } from 'src/app/services/errorhandler.service';
import { NotificationService } from 'src/app/services/notification.service'
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  editor_Menu: FormGroup;

  imgs: any[] = [];
  url: any;
  format: any;
  selectedFile: Array<any> = [];

  mForm: MenuForm = {
    name: '',
    restaurant_id: '',
    category: '',
    price: '',
    item_description: '',
    status: '',
    customization: []
  };

  itemName: string = '';
  itemPrice: string = '';
  itemDesc: string = "";
  isCategoryPopup: boolean = true;
  addPlaceHolder: string = '';
  editMode: boolean = false;
  addMode: boolean = false;
  ddlAutoClose: boolean = true;
  subCategorySelectedValue: string = '';
  addCustmization: boolean = false;
  custmizationName: string = '';
  newCustomizationName: any;

  mainselection: any;
  subselection: any;

  closeResult: any;

  newCustName: string = "";
  newCustPrice: string = "";
  mainCategory: any[] = [];
  subCategory: any[] = [];
  customizationList: any[] = [{}];
  customizationDetailList: any[] = [{}];

  isEditCategory: boolean = false;
  isEditCategoryId: string = '';
  isEditCategoryText: string = '';
  isAddCategoryText: string = '';
  subCatSelect: any;
  showLoader: boolean = false;

  get f() {
    return this.editor_Menu.controls;
  }
  constructor(
    //public mForm:MenuForm,
    private modalService: NgbModal,
    private notifyService: NotificationService,
    private errorHandler: ErrorhandlerService,
    public categoryService: CategoryService,
    public router: Router,
    fb: FormBuilder
  ) {
    this.editor_Menu = fb.group({
      'itemName': [null, Validators.compose([Validators.required])],
      'itemPrice': [null, Validators.compose([Validators.required])],
      'subCategoryddl': [null, Validators.compose([Validators.required])],
      'maincategoryddl': [null, Validators.compose([Validators.required])],
      'newCustomizationName': [null, Validators.compose([Validators.required])],
      'newCustomizationPrice': [null, Validators.compose([Validators.required])],
      'editabelCategory': [null, Validators.compose([Validators.required])],
      'newCustomizationNamePopup': [null, Validators.compose([Validators.required])],
      'file': ['null', Validators.compose([Validators.required])],

      'maincategoryddlPopup': [null, Validators.compose([Validators.required])],
      'editnewCategory': [null, Validators.compose([Validators.required])],
      'addnewCategory': [null, Validators.compose([Validators.required])],


      //'emailPhone': [null, Validators.compose([Validators.required, Validators.pattern(/^(\+\d{11}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],                 
      //'emailPhone': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],      
    });
  }

  ngOnInit(): void {
    this.bindMainCategory();

    //alert(localStorage.getItem("id"));
  }

  btnClickGoToMenuList() {
    this.router.navigateByUrl('/user/seller/menu/menuview');
  }

  getCustomizationListAndBind() {
    this.categoryService.getCustomizationList().subscribe((data) => {
      this.showLoader = false;
      var resp = data;

      if (resp.status) {
        this.customizationList = resp.data.map((x: any) => {
          return {
            "id": x.id,
            "customization_name": x.custmization_name,
            "status": x.status,
            "create_ts": x.create_ts,
            "update_ts": x.update_ts
          }
        });
      }
    },
      err => {

        this.customizationList = [{}];
        var errMsg = err;
        this.showLoader = false;
        //this.notifyService.showError(errMsg,"");
      }
    )
  }
  arrangeCustList(x: any) {
    x.selected = !x.selected;
    if (this.customization.filter(c => c.id == x.id).length == 0) {
      this.customization.push({
        id: x.id,
        customization_name: x.customization_name,
        param: []
      });
    }
  }
  openCustomizationModel(content: any) {

    //this.editor_Menu.controls['newCustomizationNamePopup'].setVali(dators([]);
    this.editor_Menu.controls['newCustomizationNamePopup'].reset();
    this.newCustomizationName = '';
    this.getCustomizationListAndBind();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddEditCategoryPopup(content: any, popupType: boolean) {
    this.editor_Menu.controls['addnewCategory'].reset();
    this.editor_Menu.controls['editnewCategory'].reset();
    this.isEditCategory = false;
    this.isEditCategoryText = "";
    this.isAddCategoryText = "";

    this.isCategoryPopup = popupType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    //alert(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addEditDeleteCustomization(actionName: string, id: string) {
    //alert(this.newCustomizationName);
    //return;
    this.showLoader = true;
    if (actionName === 'add') {
      if (!this.editor_Menu.controls['newCustomizationNamePopup'].valid) {
        this.editor_Menu.controls['newCustomizationNamePopup'].markAsTouched();
        return;
      }


      //return;

      var objCust = { customization_name: this.newCustomizationName, status: "1", price: "" }
      this.categoryService.addCustomization(objCust).subscribe((data) => {
        debugger;
        this.showLoader = false;
        var resp = data;
        this.editor_Menu.controls['newCustomizationNamePopup'].setValue("");
        this.editor_Menu.controls['newCustomizationNamePopup'].markAsUntouched();
        this.editor_Menu.controls['newCustomizationNamePopup'].setErrors(null);
        if (resp.error == 'false' || resp.error == false) {
          this.notifyService.showSuccess(resp.message, "");
          if (this.customization.length > 0) {
            this.customization[this.customization.length].title = this.newCustomizationName;
          }
          else if (this.customization[0]) {
            this.customization[0].title = this.newCustomizationName;
          }

        }
        this.getCustomizationListAndBind();
        this.customization.push({ title: this.newCustomizationName, param: [] })

      },
        err => {

          var errMsg = err;
          this.notifyService.showError(errMsg, "");
          this.customization[0].title = this.newCustomizationName;
          console.log(this.customization);
          this.showLoader = false;
        }
      )
    }
    else if (actionName === 'edit') {

    }
    else if (actionName === 'delete') {

      let objCustId = { id: String(id), type: "customization" }
      this.categoryService.deleteGeneric(objCustId).subscribe((data) => {

        let resp = data;

        if (resp.error == false || resp.error === 'false') {
          this.notifyService.showSuccess(resp.message, "");
        }
        this.getCustomizationListAndBind();
      },
        err => {

          var errMsg = err;
          this.notifyService.showError(errMsg, "");
        }
      )
    }
  }

  addEditDeleteCategories(actionName: string, id: string, value: string) {
    let parentCatId = this.mainselection;
    let rest_id = "1";
    let objCat;
    let isCatFormValid = true;

    if (actionName === 'add') {
      if (this.isCategoryPopup == true) {
        objCat = { category_name: this.isAddCategoryText, parent_category: "0", category_description: this.isAddCategoryText, status: "1" }
      }
      else {
        if (!this.editor_Menu.controls['maincategoryddlPopup'].valid) {
          this.editor_Menu.controls['maincategoryddlPopup'].markAsTouched();
          isCatFormValid = false;
        }
        objCat = { category_name: this.isAddCategoryText, category_description: this.isAddCategoryText, status: "1", parent_category: String(parentCatId) }
      }
      if (!this.editor_Menu.controls['addnewCategory'].valid) {
        this.editor_Menu.controls['addnewCategory'].markAsTouched();
        isCatFormValid = false;
      }

      if (!isCatFormValid) {
        return;
      }

      this.categoryService.addCategory(objCat).subscribe((data) => {

        let resp = data;

        if (resp.error == 'false' || resp.error == false) {
          this.bindMainCategory();
          this.notifyService.showSuccess(resp.message, "");
        }
      },
        err => {

          let errMsg = err;
          this.notifyService.showError(errMsg, "");
        }
      )
    }
    else if (actionName === 'edit') {
      if (!this.editor_Menu.controls['editnewCategory'].valid) {
        this.editor_Menu.controls['editnewCategory'].markAsTouched();
        isCatFormValid = false;
      }
      if (!isCatFormValid) {
        return;
      }

      objCat = { id: String(id), category_name: this.isEditCategoryText }
      this.categoryService.editCategory(objCat).subscribe((data) => {

        let resp = data;

        if (resp.error == 'false' || resp.error == false) {
          this.notifyService.showSuccess(resp.message, "");
        }
      },
        err => {

          let errMsg = err;
          this.notifyService.showError(errMsg, "");
        }
      )
    }
    else if (actionName === 'delete') {
      let objCat = { id: String(id), type: "category" }
      this.categoryService.deleteGeneric(objCat).subscribe((data) => {
        let resp = data;

        if (resp.error == false || resp.error === 'false') {
          this.notifyService.showSuccess(resp.message, "");
        }
      },
        err => {

          var errMsg = err;
          this.notifyService.showError(errMsg, "");
        }
      )
    }
    else if (actionName === 'editMode') {
      this.editor_Menu.controls['addnewCategory'].reset();
      this.editor_Menu.controls['editnewCategory'].reset();
      this.isEditCategoryText = '';
      this.isEditCategory = true;
      this.isEditCategoryId = id;
      this.isEditCategoryText = value;
    }
    else if (actionName === 'cancleMode') {
      this.editor_Menu.controls['addnewCategory'].reset();
      this.editor_Menu.controls['editnewCategory'].reset();
      this.isEditCategory = false;
      this.isEditCategoryId = '';
    }
  }

  addEditCategory(value: any, actionName: string) {
    this.ddlAutoClose = true;
    if (actionName === 'addopen')// Add option open
    {
      this.editMode = false;
      this.addMode = true;
      this.subCategorySelectedValue = value;
    }
    else if (actionName === 'addnew') //Add new item
    {
      //alert(this.addPlaceHolder);   
      //this.drinks.push({value: this.addPlaceHolder, label: this.addPlaceHolder});
      //this.drinks = [...this.drinks, {value: this.addPlaceHolder, label: this.addPlaceHolder}];

      var sbc = 'asasa';
    }
    else if (actionName === 'editopen') // Edit option open
    {
      //alert(value)
      this.subCategorySelectedValue = '';
      this.addMode = false;
      this.editMode = true;
      this.ddlAutoClose = false;
      this.subCategorySelectedValue = value;
      //alert(this.subCategorySelectedValue);     
    }
    else if (actionName === 'editclose') // Edit option open
    {
      //alert(value)
      this.addMode = false;
      this.editMode = false;
      this.ddlAutoClose = false;
      this.subCategorySelectedValue = value;
    }

    else if (actionName === 'edit') //Add new item
    {
      alert(this.addPlaceHolder);
      //this.drinks.push({value: this.addPlaceHolder, label: this.addPlaceHolder});
      //this.drinks = [...this.drinks, {value: this.addPlaceHolder, label: this.addPlaceHolder}];

      var sbc = 'asasa';
    }
    else if (actionName === 'ddlclose') // Auto close dropdoown
    {
      //alert(5)
      this.ddlAutoClose = true;
      this.addMode = false;
      this.editMode = false;
      this.subCategorySelectedValue = '';
    }

  }

  focusInputField() {

    this.ddlAutoClose = true;
    this.addMode = false;
    this.editMode = false;
  }

  closeEditCategory(value: any, actionId: number) {
    if (actionId === 1) {
      this.editMode = false;
      this.addMode = false;
    }
  }

  customization: any[] = [];
  orgcustomization: CustomizationList[] = [
    {
      "title": "Quantity",
      "param": [
        {
          "customization_name": "half",
          "price": "$2",
          "status": true
        },
        {
          "customization_name": "half",
          "price": "$4",
          "status": true

        }]
    },
    {
      "title": "Milk",
      "param": [
        {
          "customization_name": "half",
          "price": "$1",
          "status": true
        },
        {
          "customization_name": "half",
          "price": "$2",
          "status": false

        }]
    }
  ];

  addCustomizationDetails(id: string, actionType: string) {
   debugger;
    let custItem = this.customization.filter(x => x.id === id);
   
    if (actionType === 'open') {
      if (custItem.length) {
        this.editor_Menu.controls['newCustomizationName'].reset();
        this.editor_Menu.controls['newCustomizationPrice'].reset();
        this.addCustmization = true;
        this.custmizationName = custItem[0].customization_name;
        this.newCustName = "";
        this.newCustPrice = "";
      }
     
    }
    else if (actionType === 'add') {
      if (custItem.length) {
        custItem[0].param.push({
          "title": this.newCustName,
          "price": this.newCustPrice,
          "status": true
        });

        this.notifyService.showSuccess('Added successfully', '');
      }

      this.addCustmization = false;
    }
    else if (actionType === 'close') {
      this.addCustmization = false;
    }
  }

  mainCategoryDDLSelect(val: any) {
    //alert(val);    
    console.log(val);
    this.bindSubCategory(val);
  }
  subCategoryDDLSelect(val: any) {
    //alert('Hi');
    console.log(val);
    this.subCatSelect = val;
  }

  bindMainCategory() {
    //this.mainCategory=
    this.categoryService.getAllCategory().subscribe((data) => {

      var resp = data;

      if (resp.status) {
        this.mainCategory = resp.data;
        console.log(this.mainCategory);
        //console.log(this.drinks);
        //this.notifyService.showSuccess(resp.message,""); 
        //this.router.navigate(['/verifypin'], {state: {data: {email:emPhone}}});       
      }
    },
      err => {

        this.mainCategory = [];
        var errMsg = err;
        //this.notifyService.showError(errMsg,"");
      }
    )
  }

  bindSubCategory(catId: any) {

    if (catId === undefined || catId === null) {
      catId = '-1';
    }
    this.categoryService.getCategoryByCatId(catId).subscribe((data) => {

      var resp = data;

      if (resp.status) {
        this.subCategory = resp.data;
        console.log(this.subCategory);
        //console.log(this.drinks);
        //this.notifyService.showSuccess(resp.message,""); 
        //this.router.navigate(['/verifypin'], {state: {data: {email:emPhone}}});       
      }
    },
      err => {
        this.subCategory = [];

        var errMsg = err;
        //this.notifyService.showError(errMsg,"");
      }
    )
  }

  onSelectFile(event: any) {

    const file = event.target.files && event.target.files[0];
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(event.target.files[i]);
    }

    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.imgs = [...this.imgs, { url: this.url }];

        var xy = '';
      }
    }
  }

  submitMenuForm() {
    //this.editor_Menu.valid;
    let isFormValid = true;

    if (this.selectedFile.length) {
      this.editor_Menu.controls['file'].markAsTouched();
    }
    if (!this.editor_Menu.controls['itemName'].valid) {
      this.editor_Menu.controls['itemName'].markAsTouched();
      isFormValid = false;
    }
    if (!this.editor_Menu.controls['itemPrice'].valid) {
      this.editor_Menu.controls['itemPrice'].markAsTouched();
      isFormValid = false;
    }
    if (!this.editor_Menu.controls['maincategoryddl'].valid) {
      this.editor_Menu.controls['maincategoryddl'].markAsTouched();
      isFormValid = false;
    }
    if (!this.editor_Menu.controls['subCategoryddl'].valid) {
      this.editor_Menu.controls['subCategoryddl'].markAsTouched();
      isFormValid = false;
    }

    //alert('Final Save');
    if (!isFormValid) {
      return;
    }

    //alert('submit');
    var name = this.itemName;
    var restaurant_id = "1";
    var category = this.mainselection;
    var item_description = this.itemDesc;
    var status = '1';
    var price = this.itemPrice;
    this.mForm.category = this.subCatSelect + "";
    this.mForm.name = name;
    this.mForm.restaurant_id = restaurant_id;
    this.mForm.item_description = item_description;
    this.mForm.price = price;
    this.mForm.status = status;
    this.mForm.customization = this.customization;

    console.log(JSON.stringify(this.mForm))
    console.log(this.mForm);
    var formData: any = new FormData();
    formData.append("data", JSON.stringify(this.mForm));
    this.selectedFile.map(file => formData.append("item_image", file));
    //formData.append("item_image[]", this.selectedFile);

    console.log(formData);

    this.categoryService.createNewMenuItem(formData).subscribe(res => {
    
      this.editor_Menu.reset();
      this.notifyService.showSuccess('Uploaded Successfully.', null);
      setTimeout(()=>this.router.navigateByUrl('user/seller/menu/menuview'),800);
    },
      (error) => {
        this.notifyService.showError("Oops something went wrong! Please try again.", null);
        console.log(error)
      });

  }
  ondescInput($event: any) {
    this.itemDesc = $event.currentTarget.value + "";
  }
}
