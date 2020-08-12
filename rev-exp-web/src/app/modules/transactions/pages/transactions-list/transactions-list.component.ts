import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

// services
import { MatDialog } from '@angular/material/dialog';
import { TransactionFormDialogComponent } from '../../dialogs/transaction-form-dialog/transaction-form-dialog.component';

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
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
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

  async add(){
    const dialogRef = await this.dialog.open(TransactionFormDialogComponent, {
      panelClass: 'transaction-form-dialog',
      height: null,
      width: '60vw',
      data: {
        categories: []
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.spinner.show();
      }
    })
  }



}
