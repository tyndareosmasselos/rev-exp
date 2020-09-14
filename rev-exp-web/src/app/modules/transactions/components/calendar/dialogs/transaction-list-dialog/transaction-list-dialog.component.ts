import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../../../services/transaction.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list-dialog',
  templateUrl: './transaction-list-dialog.component.html',
  styleUrls: ['./transaction-list-dialog.component.scss']
})
export class TransactionListDialogComponent implements OnInit {
  private refresh = false;
  
  constructor(
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransactionListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  onDelete(element){
    this.transactionService.delete(element._id).then(res => {
      let index = this.data.findIndex(x => x._id == element._id)
      this.data.splice(index, 1)
      this.refresh = true;
      if(this.data.length == 0){
        this.dialogRef.close(this.refresh)
      }
    })
  }

}
