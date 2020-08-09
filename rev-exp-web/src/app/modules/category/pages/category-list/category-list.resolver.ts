import { Injectable, isDevMode } from "@angular/core";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

// services
import { CategoryService } from "../../services/category.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryListDataResolver implements Resolve<any> {
    pageData: any;
    onPageDataChanged: BehaviorSubject<any>;

    constructor(
        private categoryService: CategoryService, 
        private activatedRoute: ActivatedRoute
        ) {
        // Set the defaults
        this.onPageDataChanged = new BehaviorSubject({});
    }

    resolve(
    ): Observable<any> | Promise<any> | any {
        return this.getPageData();
    }

    getPageData(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.categoryService.getAll()
                .subscribe((response:any) => {
                    let pageData = response.payload ?? response;
                    this.onPageDataChanged.next(pageData);
                    if (isDevMode()) {
                        console.log(`${CategoryListDataResolver.name}.${this.getPageData.name} data`, 
                        { 
                            pageData: this.pageData
                        })
                    }
                    // this.spinnerService.hide();
                    resolve(pageData);
                }, reject);
        });
    }
}