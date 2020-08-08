import { Component, OnInit, isDevMode } from '@angular/core';
import { CategoryModel } from '../../../../models/categoy.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CategoryListDataResolver } from './category-list.resolver';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  showProgressBar: boolean = true;
  displayedColumns: string[] = ['name', 'type', 'actions'];
  dataSource = new MatTableDataSource<CategoryModel>([]);

  constructor(
    private route: ActivatedRoute,
    private dataResolver: CategoryListDataResolver,
  ) { }

  ngOnInit() {
    this.route.data
    .pipe()
    .subscribe((routeData) => {
        this.dataSource = new MatTableDataSource<CategoryModel>(routeData.pageData || []);
        this.showProgressBar = false;
        if (isDevMode()) {
          console.log('routeData subscription update', routeData);
        }
    });
  }


    // // Subscribe to page data
    // this.dataResolver.onPageDataChanged
    //     .pipe()
    //     .subscribe((data) => {
    //         this.progressBar.hide();
    //         if (this.dataGrid)
    //             if (this.dataGrid.instance)
    //                 this.dataGrid.instance.endCustomLoading();
    //         if (isDevMode()) {
    //             console.log('data resolver subscription update', data);
    //         }
    //         this.pageData = data;
    //     });
    //   }

}
