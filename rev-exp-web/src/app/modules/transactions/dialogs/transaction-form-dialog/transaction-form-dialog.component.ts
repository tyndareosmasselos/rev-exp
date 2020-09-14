import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoryModel } from '../../../../models/categoy.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DataArgs {
  categories: CategoryModel[]
}

@Component({
  selector: 'app-transaction-form-dialog',
  templateUrl: './transaction-form-dialog.component.html',
  styleUrls: ['./transaction-form-dialog.component.scss']
})
export class TransactionFormDialogComponent implements OnInit {
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransactionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogArgs: DataArgs
  ) { 
    // create form
    this.transactionForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      category_id: new FormControl(null),
      created: new FormControl(null)
    })
  }

  ngOnInit() {
  }

  submit(){
    let date = new Date(this.transactionForm.value['created']);
    date.setHours(date.getHours() + 3);
    let value = {
      name: this.transactionForm.value['name'],
      amount: this.transactionForm.value['amount'],
      category_id: this.transactionForm.value['category_id']._id,
      created: date.getTime() /1000,
    }
    this.dialogRef.close({
      data: value
    })
  }

}
