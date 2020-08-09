import { Component, OnInit } from '@angular/core';

interface Navagation {
  path: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  navigations: Navagation[] = [
    {
      path: "transactions",
      text: "Transactions",
      icon: "receipt_long"
    },
    {
      path: "categories",
      text: "Categories",
      icon: "category"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
