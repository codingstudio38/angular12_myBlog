import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { map } from 'rxjs/operators';  
// import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout'; 
// var Highcharts = require("highcharts/highmaps.js");  
// import { Options } from "highcharts";  
// var worldMap = require("@highcharts/map-collection/custom/world.geo.json"); 
import {EChartsOption} from 'echarts';
import * as echarts from 'echarts';
// import * as usaJson from 'src/assets/USA.json';
// import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     this.myMap();
(function ($) {
   
})(jQuery);
  }


// Highcharts: typeof Highcharts = Highcharts;  
//     chartConstructor = "mapChart";  
//     updateFlag = false;  
//     chartData = [{  
//         code3: "ABW",  
//         z: 105  
//     }, {  
//         code3: "AFG",  
//         z: 35530  
//     }];  
  
//     chartOptions: Options = {  
//         chart: {  
//             map: worldMap as any  
//         },  
//         title: {  
//             text: "Angualr Highchart World Map"  
//         },  
//         subtitle: {  
//             text: 'Sub title: <a href="http://code.highcharts.com/mapdata/custom/world.js"> xyzzzz</a>'  
//         },  
//         exporting: {  
//             enabled: true  
//         },  
//         credits: {  
//             enabled: true  
//         },  
//         mapNavigation: {  
//             enabled: true,  
//             buttonOptions: {  
//                 alignTo: "spacingBox"  
//             }  
//         },  
//         legend: {  
//             enabled: true  
//         },  
//         colorAxis: {  
//             dataClasses: [{  
//                 to: 25,  
//                 color: '#922291'  
//             }, {  
//                 from: 26,  
//                 to: 50,  
//                 color: '#c893c7'  
//             }, {  
//                 from: 51,  
//                 to: 75,  
//                 color: '#00a2ad'  
//             }, {  
//                 from: 76,  
//                 to: 100,  
//                 color: '#7fd0d6'  
//             }],  
//             type: 'linear',  
//         },  
//         series: [{  
  
//             point: {  
//                 events: {  
//                     click: (e:any) => {  
//                         this.getDataByCountryKey(e.point['hc-key'])  
//                     }  
  
//                     // click: this.getDataByCountryKey.bind(this)    
//                 }  
//             },  
//             type: "map",  
//             name: "Random Data",  
//             states: {  
//                 hover: {  
//                     color: "#BADA55"  
//                 }  
//             },  
//             dataLabels: {  
//                 enabled: true,  
//                 format: "{point.name}"  
//             },  
//             allAreas: false,  
//             data: [  
//                 ["fo", 0],  
//                 ["um", 1],  
//                 ["us", 2],  
//                 ["jp", 3],  
//                 ["sc", 4],  
//                 ["in", 5],  
//                 ["fr", 6],  
//                 ["fm", 7],  
//                 ["cn", 8],  
//                 ["pt", 9],  
//                 ["sw", 10],  
//                 ["sh", 11],  
//                 ["br", 12],  
//                 ["ki", 13],  
//                 ["ph", 14],  
//                 ["mx", 15],  
//                 ["es", 16],  
//                 ["bu", 17],  
//                 ["mv", 18],  
//                 ["sp", 19],  
//                 ["gb", 20],  
//                 ["gr", 21],  
//                 ["as", 22],  
//                 ["dk", 23],  
//                 ["gl", 24],  
//                 ["gu", 25],  
//                 ["mp", 26],  
//                 ["pr", 27],  
//                 ["vi", 28],  
//                 ["ca", 29],  
//                 ["st", 30],  
//                 ["cv", 31],  
//                 ["dm", 32],  
//                 ["nl", 33],  
//                 ["jm", 34],  
//                 ["ws", 35],  
//                 ["om", 36],  
//                 ["vc", 37],  
//                 ["tr", 38],  
//                 ["bd", 39],  
//                 ["lc", 40],  
//                 ["nr", 41],  
//                 ["no", 42],  
//                 ["kn", 43],  
//                 ["bh", 44],  
//                 ["to", 45],  
//                 ["fi", 46],  
//                 ["id", 47],  
//                 ["mu", 48],  
//                 ["se", 49],  
//                 ["tt", 50],  
//                 ["my", 51],  
//                 ["pa", 52],  
//                 ["pw", 53],  
//                 ["tv", 54],  
//                 ["mh", 55],  
//                 ["cl", 56],  
//                 ["th", 57],  
//                 ["gd", 58],  
//                 ["ee", 59],  
//                 ["ag", 60],  
//                 ["tw", 61],  
//                 ["bb", 62],  
//                 ["it", 63],  
//                 ["mt", 64],  
//                 ["vu", 65],  
//                 ["sg", 66],  
//                 ["cy", 67],  
//                 ["lk", 68],  
//                 ["km", 69],  
//                 ["fj", 70],  
//                 ["ru", 71],  
//                 ["va", 72],  
//                 ["sm", 73],  
//                 ["kz", 74],  
//                 ["az", 75],  
//                 ["tj", 76],  
//                 ["ls", 77],  
//                 ["uz", 78],  
//                 ["ma", 79],  
//                 ["co", 80],  
//                 ["tl", 81],  
//                 ["tz", 82],  
//                 ["ar", 83],  
//                 ["sa", 84],  
//                 ["pk", 85],  
//                 ["ye", 86],  
//                 ["ae", 87],  
//                 ["ke", 88],  
//                 ["pe", 89],  
//                 ["do", 90],  
//                 ["ht", 91],  
//                 ["pg", 92],  
//                 ["ao", 93],  
//                 ["kh", 94],  
//                 ["vn", 95],  
//                 ["mz", 96],  
//                 ["cr", 97],  
//                 ["bj", 98],  
//                 ["ng", 99],  
//                 ["ir", 100],  
//                 ["sv", 101],  
//                 ["sl", 102],  
//                 ["gw", 103],  
//                 ["hr", 104],  
//                 ["bz", 105],  
//                 ["za", 106],  
//                 ["cf", 107],  
//                 ["sd", 108],  
//                 ["cd", 109],  
//                 ["kw", 110],  
//                 ["de", 111],  
//                 ["be", 112],  
//                 ["ie", 113],  
//                 ["kp", 114],  
//                 ["kr", 115],  
//                 ["gy", 116],  
//                 ["hn", 117],  
//                 ["mm", 118],  
//                 ["ga", 119],  
//                 ["gq", 120],  
//                 ["ni", 121],  
//                 ["lv", 122],  
//                 ["ug", 123],  
//                 ["mw", 124],  
//                 ["am", 125],  
//                 ["sx", 126],  
//                 ["tm", 127],  
//                 ["zm", 128],  
//                 ["nc", 129],  
//                 ["mr", 130],  
//                 ["dz", 131],  
//                 ["lt", 132],  
//                 ["et", 133],  
//                 ["er", 134],  
//                 ["gh", 135],  
//                 ["si", 136],  
//                 ["gt", 137],  
//                 ["ba", 138],  
//                 ["jo", 139],  
//                 ["sy", 140],  
//                 ["mc", 141],  
//                 ["al", 142],  
//                 ["uy", 143],  
//                 ["cnm", 144],  
//                 ["mn", 145],  
//                 ["rw", 146],  
//                 ["so", 147],  
//                 ["bo", 148],  
//                 ["cm", 149],  
//                 ["cg", 150],  
//                 ["eh", 151],  
//                 ["rs", 152],  
//                 ["me", 153],  
//                 ["tg", 154],  
//                 ["la", 155],  
//                 ["af", 156],  
//                 ["ua", 157],  
//                 ["sk", 158],  
//                 ["jk", 159],  
//                 ["bg", 160],  
//                 ["qa", 161],  
//                 ["li", 162],  
//                 ["at", 163],  
//                 ["sz", 164],  
//                 ["hu", 165],  
//                 ["ro", 166],  
//                 ["ne", 167],  
//                 ["lu", 168],  
//                 ["ad", 169],  
//                 ["ci", 170],  
//                 ["lr", 171],  
//                 ["bn", 172],  
//                 ["iq", 173],  
//                 ["ge", 174],  
//                 ["gm", 175],  
//                 ["ch", 176],  
//                 ["td", 177],  
//                 ["kv", 178],  
//                 ["lb", 179],  
//                 ["dj", 180],  
//                 ["bi", 181],  
//                 ["sr", 182],  
//                 ["il", 183],  
//                 ["ml", 184],  
//                 ["sn", 185],  
//                 ["gn", 186],  
//                 ["zw", 187],  
//                 ["pl", 188],  
//                 ["mk", 189],  
//                 ["py", 190],  
//                 ["by", 191],  
//                 ["cz", 192],  
//                 ["bf", 193],  
//                 ["na", 194],  
//                 ["ly", 195],  
//                 ["tn", 196],  
//                 ["bt", 197],  
//                 ["md", 198],  
//                 ["ss", 199],  
//                 ["bw", 200],  
//                 ["bs", 201],  
//                 ["nz", 202],  
//                 ["cu", 203],  
//                 ["ec", 204],  
//                 ["au", 205],  
//                 ["ve", 206],  
//                 ["sb", 207],  
//                 ["mg", 208],  
//                 ["is", 209],  
//                 ["eg", 210],  
//                 ["kg", 211],  
//                 ["np", 212]  
//             ]  
//         }]  
  
//     };  
  
   
  
//     getDataByCountryKey(ckey: any) {  
//         console.log('CountryKey:' + ckey);  
//     } 

chartOption: EChartsOption = {
 
};

myMap(){
  echarts.registerMap('USA', 'src/assets/USA.json');
  this.chartOption = {
    title: {
      text: 'USA Population Estimates (2012)',
      subtext: 'Data from www.census.gov',
      sublink: 'http://www.census.gov/popest/data/datasets.html',
      left: 'right'
    },
    tooltip: {
      trigger: 'item',
      showDelay: 0,
      transitionDuration: 0.2
    },
    visualMap: {
      left: 'right',
      min: 500000,
      max: 38000000,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      },
      text: ['High', 'Low'], 
      calculable: true
    },
    toolbox: {
      show: true,
      //orient: 'vertical',
      left: 'left',
      top: 'top',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'USA PopEstimates',
        type: 'map',
        map: 'USA',
        projection: {
          project: function (point) {
            return point;
          },
          unproject: function (point) {
            return point;
          }
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { name: 'Alabama', value: 4822023 },
          { name: 'Alaska', value: 731449 },
          { name: 'Arizona', value: 6553255 },
          { name: 'Arkansas', value: 2949131 },
          { name: 'California', value: 38041430 },
          { name: 'Colorado', value: 5187582 },
          { name: 'Connecticut', value: 3590347 },
          { name: 'Delaware', value: 917092 },
          { name: 'District of Columbia', value: 632323 },
          { name: 'Florida', value: 19317568 },
          { name: 'Georgia', value: 9919945 },
          { name: 'Hawaii', value: 1392313 },
          { name: 'Idaho', value: 1595728 },
          { name: 'Illinois', value: 12875255 },
          { name: 'Indiana', value: 6537334 },
          { name: 'Iowa', value: 3074186 },
          { name: 'Kansas', value: 2885905 },
          { name: 'Kentucky', value: 4380415 },
          { name: 'Louisiana', value: 4601893 },
          { name: 'Maine', value: 1329192 },
          { name: 'Maryland', value: 5884563 },
          { name: 'Massachusetts', value: 6646144 },
          { name: 'Michigan', value: 9883360 },
          { name: 'Minnesota', value: 5379139 },
          { name: 'Mississippi', value: 2984926 },
          { name: 'Missouri', value: 6021988 },
          { name: 'Montana', value: 1005141 },
          { name: 'Nebraska', value: 1855525 },
          { name: 'Nevada', value: 2758931 },
          { name: 'New Hampshire', value: 1320718 },
          { name: 'New Jersey', value: 8864590 },
          { name: 'New Mexico', value: 2085538 },
          { name: 'New York', value: 19570261 },
          { name: 'North Carolina', value: 9752073 },
          { name: 'North Dakota', value: 699628 },
          { name: 'Ohio', value: 11544225 },
          { name: 'Oklahoma', value: 3814820 },
          { name: 'Oregon', value: 3899353 },
          { name: 'Pennsylvania', value: 12763536 },
          { name: 'Rhode Island', value: 1050292 },
          { name: 'South Carolina', value: 4723723 },
          { name: 'South Dakota', value: 833354 },
          { name: 'Tennessee', value: 6456243 },
          { name: 'Texas', value: 26059203 },
          { name: 'Utah', value: 2855287 },
          { name: 'Vermont', value: 626011 },
          { name: 'Virginia', value: 8185867 },
          { name: 'Washington', value: 6897012 },
          { name: 'West Virginia', value: 1855413 },
          { name: 'Wisconsin', value: 5726398 },
          { name: 'Wyoming', value: 576412 },
          { name: 'Puerto Rico', value: 3667084 }
        ]
      }
    ]
  };
}



}
