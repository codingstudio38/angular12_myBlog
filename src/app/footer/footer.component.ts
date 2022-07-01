import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() {
    //this.hideLoder();
  }

  ngOnInit(): void {
  }
  hideis: any = false;
  hideLoder() {
    setTimeout(() => {
      this.hideis = false;
    }, 1000);
  }
}
