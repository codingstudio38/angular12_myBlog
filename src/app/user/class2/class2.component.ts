import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RegisterApiServiceService } from '../../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
declare var jQuery: any;
@Component({
  selector: 'app-class2',
  templateUrl: './class2.component.html',
  styleUrls: ['./class2.component.css']
})
export class Class2Component implements OnInit {

  multiple_data: FormGroup;
  view_multiple_data: FormGroup;
  constructor(private API: RegisterApiServiceService, private formbuild: FormBuilder) {
    this.getAllmultiUsers();
    this.multiple_data = this.formbuild.group({
      allproduct: this.formbuild.array([]),
      cname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      cemail: new FormControl('', [Validators.required, Validators.email]),
      cphone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    });

    this.view_multiple_data = this.formbuild.group({
      view_allproduct: this.formbuild.array([]),
      customer_id: new FormControl('', [Validators.required]),
      customer_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      customer_email: new FormControl('', [Validators.required, Validators.email]),
      customer_phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  ngOnInit(): void {

  }


  product(): FormArray {
    return this.multiple_data.get("allproduct") as FormArray
  }
  get cname() {
    return this.multiple_data.get('cname');
  }
  get cemail() {
    return this.multiple_data.get('cemail');
  }
  get cphone() {
    return this.multiple_data.get('cphone');
  }


  newProduct(): FormGroup {
    return this.formbuild.group({
      name: '',
      qty: '',
      price: '',
      productfile: '',
    })
  }

  addProduct() {
    this.product().push(this.newProduct());
  }

  removeProduct(i: number) {
    this.product().removeAt(i);
  }

  api_multiple: any;
  sfile: any;
  setfile(event: any, id: number) {
    if (event.target.files.length > 0) {
      this.sfile = <File>event.target.files[0];
    } else {
      this.sfile = null;
    }
    this.multiple_data.value.allproduct[id].productfile = this.sfile;
  }


  uploadMultiple() {
    const all = this.multiple_data.value.allproduct;
    const mForm = new FormData();
    mForm.append("cname", this.multiple_data.get('cname')?.value);
    mForm.append("cphone", this.multiple_data.get('cphone')?.value);
    mForm.append("cemail", this.multiple_data.get('cemail')?.value);
    for (var i = 0; i < all.length; i++) {
      mForm.append("name[]", all[i].name);
      mForm.append("price[]", all[i].price);
      mForm.append("qty[]", all[i].qty);
      mForm.append("photo[]", all[i].productfile);
    }
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login again."); return;
    } else {
      this.API.mutiplesPost(mForm).subscribe((response: HttpEvent<any>) => {
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
            this.api_multiple = response.body;
            // console.log(this.api_multiple); return;
            for (var i = 0; i < all.length; i++) {
              this.product().removeAt(i);
            }
            this.product().removeAt(0);
            this.multiple_data.reset();
            alert(this.api_multiple.message);
            this.getAllmultiUsers();
        }
      });
    }
  }


  allmultidata: any;
  allmultidata_res: any;
  getAllmultiUsers() {
    if (this.API.loggedinuserdata() === 0) {
      alert("Unauthorized..!! Please login again."); return;
    } else {
      this.API.viewallmultidata().subscribe((response) => {
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
            this.allmultidata_res = response.body;
            // console.log(this.allmultidata_res);
            this.allmultidata = "";
            if (this.allmultidata_res.status === 200) {
              this.allmultidata = this.allmultidata_res.allmulti_users;
            } else {
              alert(this.allmultidata_res.message);
              this.allmultidata = "";
            }

        }
      })
    }
  }

  // npm install jquery --save
  // "scripts": [
  //   "node_modules/jquery/dist/jquery.min.js"
  // ]
  // declare var jQuery: any;

  multi_productdata: any;
  multi_search_res: any;
  multi_search_status: any;

  image_array: any;

  multi_searchuser(data: any) {
    if (data.value.multi_userid == "") {
      alert("No records found..!!");
      this.multi_search_status = "";
      return;
    } else {
      if (this.API.loggedinuserdata() === 0) {
        alert("Unauthorized..!! Please login again."); return;
      } else {
        this.API.multiusersearch(data.value.multi_userid).subscribe((response: HttpEvent<any>) => {
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
              this.multi_search_res = response.body;
              this.multi_search_status = this.multi_search_res.status;
              if (this.multi_search_res.status === 200) {

                const all = this.view_multiple_data.value.view_allproduct;
                for (var i = 0; i < all.length; i++) {
                  this.view_product().removeAt(i);
                }
                this.view_product().removeAt(0);
                this.view_multiple_data.reset();
                this.image_array = [];

                this.view_multiple_data.patchValue({
                  up_id: this.multi_search_res.cuser.id,
                  customer_name: this.multi_search_res.cuser.cname,
                  customer_email: this.multi_search_res.cuser.cemail,
                  customer_phone: this.multi_search_res.cuser.cphone,
                  customer_id: this.multi_search_res.cuser.id
                });
                if (this.multi_search_res.cuser_data.length > 0) {
                  this.multi_productdata = this.multi_search_res.cuser_data;
                  for (let x = 0; x < this.multi_productdata.length; x++) {
                    this.view_product().push(this.formbuild.group({
                      up_id: this.multi_productdata[x].id,
                      new_name: this.multi_productdata[x].name,
                      new_qty: this.multi_productdata[x].qty,
                      new_price: this.multi_productdata[x].price,
                      new_file: null,
                      old_photo: this.multi_productdata[x].photo,
                    }));
                    var img = this.multi_productdata[x].photo;
                    var id = this.multi_productdata[x].up_id;
                    this.image_array.push({ rowimg: img, rowid: id })
                    setTimeout(() => {
                      (document.getElementById('viewphoto' + x) as HTMLInputElement).innerHTML = `<img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/upload-Multiples/${this.multi_productdata[x].photo}">`;
                    }, 100);
                  }
                }
              }
          }
        });
      }
    }
  }


  // var img = this.multi_productdata[x].photo;
  // alert('viewphoto' + [x]);
  // (document.getElementById('mimg' + [x]) as HTMLInputElement).setAttribute("src", `http://127.0.0.1:8000/newdemo/upload-Multiples/${this.multi_productdata[x].photo}`);
  // document.getElementById(`viewphoto${x}`).innerHTML = `<img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/upload-Multiples/${this.multi_productdata[x].photo}">`;
  // for (let c = 0; c < this.multi_productdata.length; c++) {
  //   (document.getElementById('viewphoto0') as HTMLInputElement).innerHTML = `<img style="width: 90px; height: 90px;" src="http://127.0.0.1:8000/newdemo/upload-Multiples/${this.multi_productdata[c].photo}">`
  // }
  // (function ($) {
  //   var img = document.getElementsByClassName("imgs");
  //   console.log(img);
  //   for (let z = 0; z < img.length; z++) {
  //     console.log(img[z]);
  //   }
  //   //$(`viewphoto${x}`).html();
  // })(jQuery);
  //  <img style="width: 90px; height: 90px;" src = "{{ getimg(i) }}" class="imgs"
  // id = "mimg{{i}}" >
  // findnameid: any;
  // getimg(id: any) {
  //   setTimeout(() => {
  //     console.log((document.getElementById('viewphoto0') as HTMLInputElement).innerHTML)
  //   }, 1000);
  //   if (this.image_array.length > id) {
  //     return `http://127.0.0.1:8000/newdemo/upload-Multiples/${this.image_array[id].rowimg}`;
  //   } else {
  //     return "assets/images/download.png";
  //   }
  // }

  newfile: any;
  newfileset(event: any, id: number) {
    if (event.target.files.length > 0) {
      this.newfile = <File>event.target.files[0];
    } else {
      this.newfile = null;
    }
    this.view_multiple_data.value.view_allproduct[id].new_file = this.newfile;
  }
  view_product(): FormArray {
    return this.view_multiple_data.get("view_allproduct") as FormArray
  }

  get customer_name() {
    return this.view_multiple_data.get('customer_name');
  }
  get customer_id() {
    return this.view_multiple_data.get('customer_id');
  }
  get customer_email() {
    return this.view_multiple_data.get('customer_email');
  }
  get customer_phone() {
    return this.view_multiple_data.get('customer_phone');
  }

  view_newProduct(): FormGroup {
    return this.formbuild.group({
      up_id: '',
      new_name: '',
      new_qty: '',
      new_price: '',
      new_file: '',
      old_photo: '',
    })
  }

  view_addProduct() {
    this.view_product().push(this.view_newProduct());
  }

  rowid: any;
  view_removeProduct(i: number) {
    this.rowid = (document.getElementById("up_id" + i) as HTMLInputElement).value;
    if (this.rowid == "") {
      this.view_product().removeAt(i);
    } else {
      if (confirm("Are you sure ?")) {
        this.view_product().removeAt(i);
      }
    }
  }


  api_multiple_update: any;
  updateMultiple() {
    const newf = this.view_multiple_data.value.view_allproduct;
    const updateform = new FormData();
    updateform.append("cid", this.view_multiple_data.get('customer_id')?.value);
    updateform.append("cname", this.view_multiple_data.get('customer_name')?.value);
    updateform.append("cemail", this.view_multiple_data.get('customer_email')?.value);
    updateform.append("cphone", this.view_multiple_data.get('customer_phone')?.value);
    for (var i = 0; i < newf.length; i++) {
      updateform.append("name[]", newf[i].new_name);
      updateform.append("price[]", newf[i].new_price);
      updateform.append("qty[]", newf[i].new_qty);
      updateform.append("photo[]", newf[i].new_file);
      updateform.append("upid[]", newf[i].up_id);
      updateform.append("old_photo[]", newf[i].old_photo);
    }
    this.API.mutiplesUpdate(updateform).subscribe((response: HttpEvent<any>) => {
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
          this.api_multiple_update = response.body;
          // console.log(this.api_multiple_update); return;
          for (var i = 0; i < newf.length; i++) {
            this.view_product().removeAt(i);
          }
          this.view_product().removeAt(0);
          this.view_multiple_data.reset();
          alert(this.api_multiple_update);
          this.getAllmultiUsers();
      }
    });

  }








}
