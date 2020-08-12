import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  dataSource: any[] = [];
  showProgressBar = false;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.data
    .pipe()
    .subscribe((routeData) => {
        this.dataSource = routeData.pageData || [];
        this.showProgressBar = false;
        this.spinner.hide();
        if (isDevMode()) {
          console.log('routeData subscription update', routeData);
        }
    }, () => {
      this.showProgressBar = false;
      this.spinner.hide();
    });
  }

  add(){

  }

}
