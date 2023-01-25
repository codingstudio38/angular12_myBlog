import { Component, OnInit } from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private API: RegisterApiServiceService) { }

  ngOnInit(): void {
    this.getcountrylist();
  }
contact_res:any;
counrtyres:any;
counrty_list:any;
falg:any="<img src='assets/images/download.png' width='25' height='15'>";
contact_placeholder:any="+ 00 | Contact No";

  contact_form = new FormGroup({
    contact_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
    contact_email: new FormControl('', [Validators.required, Validators.email]),
    contact_country: new FormControl('', [Validators.required]),
    contact_phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]),
    contact_subject: new FormControl('', [Validators.required]),
    contact_message: new FormControl('', [Validators.required]),
  });
 
  get contact_name() {
    return this.contact_form.get('contact_name');
  }
  get contact_email() {
    return this.contact_form.get('contact_email');
  }
  get contact_country() {
    return this.contact_form.get('contact_country');
  }
    get contact_phone() {
    return this.contact_form.get('contact_phone');
  }
    get contact_subject() {
    return this.contact_form.get('contact_subject');
  }
   get contact_message() {
    return this.contact_form.get('contact_message');
  }

box:any;
box_message:any;
contact() {
      this.API.newcontact(this.contact_form.value).subscribe((response: HttpEvent<any>) => {
        // console.log(response);
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break;
          case HttpEventType.Response:
            this.contact_res = response.body;
            this.contact_form.reset();
            this.falg = `<img src='assets/images/download.png' width='25' height='15'>`;
            this.contact_placeholder = `+ 00 | Contact No`;
            console.clear();
            //console.log(this.contact_res);
            this.box = this.contact_res.status;
            this.box_message = this.contact_res.message;
            setTimeout(()=>{
              this.box=null;
              this.box_message=null;
            },4000)
        }
      });
  }







getcountrylist() {
      this.API.countrylist().subscribe((response) => {
        switch (response.type) {
          case HttpEventType.Sent:
            // console.log('Sent' + HttpEventType.Sent);
            break;
          case HttpEventType.ResponseHeader:
            // console.log('ResponseHeader' + HttpEventType.ResponseHeader);
            break;
          case HttpEventType.UploadProgress:
            //this.evenTotal = response.total;
            //this.progress = Math.round(response.loaded / this.evenTotal * 100);
            // console.log('UploadProgress' + HttpEventType.UploadProgress);
            break; 
          case HttpEventType.Response:
            this.counrtyres = response.body;
            this.counrty_list = "";
            if (this.counrtyres.status === 200) {
              this.counrty_list = this.counrtyres.list;
            } else {
              alert(this.counrtyres.message);
              this.counrty_list = "";
            }
           // console.log(this.counrty_list);
             console.clear();
        }
      })
  }

GetFlag(val:any){
  if(val!==""){
    for (let i = 0; i < this.counrty_list.length; i++) {
     if(val==this.counrty_list[i].name){
       this.falg = `<img src='${this.counrty_list[i].flag}' width='25' height='15'>`;
       this.contact_placeholder = `${this.counrty_list[i].mobileCode}`;
     }
    }
  } else { 
     this.falg = `<img src='assets/images/download.png' width='25' height='15'>`;
       this.contact_placeholder = `+ 00 | Contact No`;
  }

}










}
 