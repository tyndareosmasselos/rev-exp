import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

// services
import { MatDialog } from '@angular/material/dialog';
import { TransactionFormDialogComponent } from '../../dialogs/transaction-form-dialog/transaction-form-dialog.component';
import { CategoryModel } from '../../../../models/categoy.model';
import { TransactionService } from '../../services/transaction.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  calendarSubject =  new BehaviorSubject<any>({});
  dataSource: any[] = [];
  categories: CategoryModel[] = [];
  showProgressBar = false;

  test: any = {}

  constructor(
    private route: ActivatedRoute,
    private transaction: TransactionService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data
    .pipe()
    .subscribe((routeData) => {
        this.dataSource = routeData.pageData || [];

        this.dataSource.forEach(transaction => {
          let created = new Date(transaction.created * 1000);
          let day = created.getDate();
          let amount =  transaction.category_id.type == "expense" ? -transaction.amount : transaction.amount
          let total = this.test[day]?.total || 0
          this.test[day] = {...this.test[day], ...{
            total: total + amount
          }}
        })
        this.calendarSubject.next(this.test);
        console.log(this.test);
        this.categories = routeData.categories || []; 
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
        categories: this.categories || []
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      this.spinner.show();
      if(result){
        this.transaction.create(result.data).then(res => {
          this.spinner.hide()
        }).catch(err => {
          this.spinner.hide()
        })
      }
    })
  }
}
