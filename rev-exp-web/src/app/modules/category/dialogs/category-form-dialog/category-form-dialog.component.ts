import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryModel } from '../../../../models/categoy.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

interface DataArgs {
  type: string;
  category?: CategoryModel
}

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html',
  styleUrls: ['./category-form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryFormDialogComponent implements OnInit {
  categoryForm: FormGroup;
  selectOptions = [
    "expense", "revenue"
  ]
  title = {
    "add": "Add new category",
    "edit": "Edit category"
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogArgs: DataArgs
  ) { 
    // create form
    this.categoryForm = this.fb.group({
      name: new FormControl(null, Validators.required),
      type: new FormControl("expense")
    })
  }

  ngOnInit() {
    // update form
    if(this.dialogArgs.type == "edit")
      this.categoryForm.patchValue(this.dialogArgs.category)
  }

  submit(){
    this.dialogRef.close({
      data: this.categoryForm.value
    })
  }

}
