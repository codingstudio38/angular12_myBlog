import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { RegisterApiServiceService } from './../../services/register-api-service.service';
import { CustomValidators } from './../../custom_form_validation/custom_validation';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
declare var Cropper: any;
@Component({
  selector: 'app-myform',
  templateUrl: './myform.component.html',
  styleUrls: ['./myform.component.css'],
})
export class MyformComponent implements OnInit {
  constructor(private formbuild: FormBuilder) { }
  cropimage: any;
  mycropper: any;
  ngOnInit(): void {
    setTimeout(() => {
      this.loadMyCodeJs()
    }, 2000)

  }

  loadMyCodeJs() {
    let currObj = this;


    $('#cropmodal').modal({ backdrop: 'static', keyboard: false });
    this.cropimage = <HTMLElement>window.document.getElementById('cropimage');
    $('#cropmodal').on('shown.bs.modal', function () {
      currObj.mycropper = new Cropper(currObj.cropimage, {
        aspectRatio: 0,// 8 / 7
        viewMode: 2,
        preview: '.crop-preview'
      });
    }).on('hidden.bs.modal', function () {
      currObj.mycropper.destroy();
      currObj.mycropper = null;
    });


  }

  hobbies_list: Array<any> = [
    { id: 1, name: 'Playing' },
    { id: 2, name: 'Singing' },
    { id: 3, name: 'Reading' },
    { id: 4, name: 'Writing' },
  ];
  myform = this.formbuild.group({
    photo: new FormControl('', [
      CustomValidators.required('Photo required'), //filevalidation('Photo required','/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/',1)
    ]),
    name: new FormControl('', [
      CustomValidators.namecheck('Enter your full name'),
    ]),
    emailid: new FormControl('', [
      CustomValidators.emailcheck('Enter a valid email'),
    ]),
    p_code: new FormControl('', [
      CustomValidators.required('Select country code'),
    ]),
    phoneno: new FormControl('', [
      CustomValidators.phonecheck('Phone no required', 10, 10),
    ]),
    password: new FormControl('', [
      CustomValidators.passwordcheck('Password required', 8, 12),
    ]),
    gender: new FormControl('', [CustomValidators.required('Gender required')]),
    hobbies: this.formbuild.array(
      [],
      [CustomValidators.checkarraylength('Hobbies required')]
    ),
  });

  get photo() {
    return this.myform.get('photo');
  }
  get gender() {
    return this.myform.get('gender');
  }
  get name() {
    return this.myform.get('name');
  }
  get emailid() {
    return this.myform.get('emailid');
  }
  get phoneno() {
    return this.myform.get('phoneno');
  }
  get password() {
    return this.myform.get('password');
  }
  get p_code() {
    return this.myform.get('p_code');
  }
  get hobbies() {
    return this.myform.get('hobbies') as FormArray;
  }

  saveItem(event: any, id: any) {
    const formArray: FormArray = this.myform.get('hobbies') as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl({ id: id, value: event.target.value }));
    } else {
      let i: number = 0;
      this.myform.get('hobbies')?.value.forEach((val: any, key: number) => {
        if (val.id == id) {
          formArray.removeAt(i);
        }
        i++;
      });
    }
    //console.clear();
    //console.log(this.myform.get('hobbies')?.value);
  }

  ex: Array<any> = ['image/png', 'image/jpeg'];
  uploadFile(event: any): any {
    let fileis = event.target.files.length > 0 ? event.target.files[0] : '';
    let filetype = event.target.files.length > 0 ? event.target.files[0].type : '';
    let filesize: any = event.target.files.length > 0 ? event.target.files[0].size : 0;
    let size: any = (parseFloat(filesize) / (1024 * 1024)).toFixed(2);
    if (fileis == '') {
      $('#renderimg').attr({ 'src': '', 'width': '', 'height': '' })
    }
    if (event.target.value == "") {
      alert('Please select a file');
      this.myform.patchValue({ photo: "" })
      return false;
    }
    if (event.target.files.length <= 0) {
      alert('Please select a file.');
      this.myform.patchValue({ photo: "" })
      return false;
    }
    if (this.ex.indexOf(filetype) < 0) {
      alert('Please select png, jpeg file');
      this.myform.patchValue({ photo: "" })
      // this.myform.controls['photo'].setValidators([
      //   CustomValidators.invalidfile('Allow only png,jpeg file'),
      // ]);
      return false;
    }
    if (parseFloat(size) > 2) {
      alert("Image size should be size less than 2 mb");
      this.myform.patchValue({ photo: "" });
      return false;
    }
    if (event.target.files.length > 0) {
      if (URL) {
        this.cropimage.src = URL.createObjectURL(event.target.files[0]);//for bob url
        $("#cropmodal").modal('show');
      } else if (FileReader) {
        let reader: any = new FileReader();
        reader.onload = function (e: any) {
          this.cropimage.src = reader.result;//for base64
          $("#cropmodal").modal('show');
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    this.myform.patchValue({ photo: <File>fileis });
    return true;
  }



  Closemodal() {
    this.mycropper.destroy();
    this.mycropper = null;
    $("#cropmodal").modal('hide');
    $("#cropimage").removeAttr("src").attr("src", 'https://avatars0.githubusercontent.com/u/3456749');
  }


  CropMyImage(): any {
    var base64data: any, reader: any;
    let ThisObj: any, canvas: any;
    ThisObj = this;
    canvas = this.mycropper.getCroppedCanvas();//{width: 8 * 50,height: 7 * 50, }
    canvas.toBlob(function (blob: any) {
      // console.log("blob url :-",URL.createObjectURL(blob));
      reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        base64data = reader.result;
        ThisObj.ConvertCropData(base64data);// Convert bast 64 data to file
        $('#renderimg').attr({ 'src': base64data, 'width': '100', 'height': '100' })
        $("#cropmodal").modal('hide');
        $("#cropimage").removeAttr("src").attr("src", 'https://avatars0.githubusercontent.com/u/3456749');
      }
    });
  }

  ConvertCropData(base64data: any): any {// for cropped base 64 data to file conver
    if (base64data !== "" || base64data !== undefined) {
      let rnd: any = (Math.random() * 100000).toFixed(0);
      let data_ex: any = base64data.split(';');
      let filenametype_ex: any = data_ex[0].split(':');
      let filenametype: any = filenametype_ex[1].split('/')[1];
      let filename: any = `${rnd}.${filenametype}`;

      let convertfile: any = this.dataURLtoFile(base64data, filename);
      let container = new DataTransfer();
      container.items.add(convertfile);
      console.log(container.files);// converted base 64 data to Files
      // console.log(URL.createObjectURL(container.files[0]));
      let reader: any = new FileReader();
      reader.onload = function (e: any) {
        // console.log(reader.result);//croped image base64 data
      };
      reader.readAsDataURL(container.files[0]);
      return true; 
    }
    return false;
  }

  dataURLtoFile(dataurl: any, filename: any): any {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }



  check() {
    console.clear();
    console.log(this.myform);
    console.log(this.myform.value);
    const Form = new FormData();
    Form.append('photo', this.myform.get('photo')?.value);
    Form.append('gender', this.myform.get('gender')?.value);
    Form.append('name', this.myform.get('name')?.value);
    Form.append('emailid', this.myform.get('emailid')?.value);
    Form.append('phoneno', this.myform.get('phoneno')?.value);
    Form.append('phone_code', this.myform.get('p_code')?.value);
    Form.append('hobbies', this.myform.get('hobbies')?.value);
    Form.append('password', this.myform.get('password')?.value);
    // console.log(Form);
  }

















}
