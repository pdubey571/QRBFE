import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-uplodtest',
  templateUrl: './uplodtest.component.html',
  styleUrls: ['./uplodtest.component.scss']
})
export class UplodtestComponent implements OnInit {

  textvalue:string="abc";

  ngOnInit(): void {
  }
  imageSrc: string = '';
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  
  constructor(private http: HttpClient,private modalService: NgbModal) { }
    
  get f(){
    return this.myForm.controls;
  }
   
  open(content:any) {
    this.modalService.open(content);
  }
  onSelectFile(event:any) {
    const reader = new FileReader();    
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.myForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
   
  submit(){
    console.log(this.myForm.value);
    debugger;
    this.http.post('http://localhost:8001/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}
