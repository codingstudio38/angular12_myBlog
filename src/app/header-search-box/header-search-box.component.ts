import { Component, OnInit,Input } from '@angular/core';
import { RegisterApiServiceService } from '../services/register-api-service.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-header-search-box',
  templateUrl: './header-search-box.component.html',
  styleUrls: ['./header-search-box.component.css']
})
export class HeaderSearchBoxComponent implements OnInit {

  constructor(private API: RegisterApiServiceService) { }

  ngOnInit(): void {
  }
 @Input() stype:any;

showresult:boolean=false;

//countries:any=null;
//allsearchdata:any[]=[];
// finddata(val:any){
//   this.countries= ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
// if(val==""){
// this.showresult=false;
// (document.getElementById('myInputautocomplete-list') as HTMLInputElement).innerHTML =""
// } else {
// this.showresult=true;
//  console.clear();
//  this.allsearchdata=[];
// for (let i = 0; i < this.countries.length; i++) {
//  if (this.countries[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//         //`<div><strong>${this.countries[i].substr(0, val.length)}</strong>${this.countries[i].substr(val.length)}</div>`;
//         this.allsearchdata.push({
//           name:this.countries[i],
//           thistag:`<strong>${this.countries[i].substr(0, val.length)}</strong>${this.countries[i].substr(val.length)}`
//         })
//         } 
//   } 
// }

// }
 


svalue:any=null;
searchvalue(val:any){
  this.showresult=false;
  this.svalue = val;
}


search_res:any;
search_data:any;
finddata(kw:any) {
  if(kw==""){
    this.search_data = null;
    this.showresult=false;
  } else {
      this.API.searchdata(this.stype,kw).subscribe((response: HttpEvent<any>) => {
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
            this.search_res = response.body;
            console.clear();
            //console.log(this.search_res);
            this.search_data = this.search_res.data;
            this.showresult=true;
        }
      });
    }
  }



}
