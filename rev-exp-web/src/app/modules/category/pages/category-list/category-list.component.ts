import { Component, OnInit, isDevMode, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from '../../../../models/categoy.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CategoryListDataResolver } from './category-list.resolver';

// services
import { NgxSpinnerService } from "ngx-spinner";
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormDialogComponent } from '../../dialogs/category-form-dialog/category-form-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent implements OnInit {
  showProgressBar: boolean = true;
  displayedColumns: string[] = ['name', 'type', 'actions'];
  dataSource = new MatTableDataSource<CategoryModel>([]);
  icon = {
    "revenue": "green",
    "expense": "red"
  }

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dataResolver: CategoryListDataResolver,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.route.data
    .pipe()
    .subscribe((routeData) => {
        this.dataSource = new MatTableDataSource<CategoryModel>(routeData.pageData || []);
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
    this.openDialog("add");
  }

  edit(category: CategoryModel){
    this.openDialog("edit", category);
  }

  async openDialog(type: string, data?: CategoryModel){
    const dialogRef = await this.dialog.open(CategoryFormDialogComponent, {
      panelClass: 'category-form-dialog',
      height: null,
      width: '60vw',
      data: {
        type: type,
        category: data
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.spinner.show();
        switch(type){
          case "add": {
            this.categoryService.create(result.data).then((res: any) => {
              this.dataSource.data.push(res.payload.category);
              this.dataSource._updateChangeSubscription();
              this.spinner.hide();
            }).catch(() => {
              this.spinner.hide();
            })
            break;
          }
          case "edit": {
            let payload = {...data, ...result.data};
            this.categoryService.update(payload).then((res: any) => {
              let index = this.dataSource.data.findIndex(x => x._id == payload._id);
              this.dataSource.data[index] = res.payload.category;
              this.dataSource._updateChangeSubscription();
              this.spinner.hide();
            }).catch(() => {
              this.spinner.hide();
            })
            break;
          }
          default: {
            this.spinner.hide();
            break;
          }
        }
      }
    })
  }

  async onDelete(element: CategoryModel){
    this.spinner.show();
    let index = this.dataSource.data.findIndex(x => x._id == element._id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    await this.categoryService.delete(element._id).then(() => {
      this.spinner.hide();
    }).catch(() => {
      this.spinner.hide();
    })
  }

}
