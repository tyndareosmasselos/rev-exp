import { Injectable, isDevMode } from "@angular/core";
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { TransactionService } from "../../services/transaction.service";
import { CalendarUtils } from "../../components/calendar/helpers/calendar.utils";
import { take } from "rxjs/operators";

// services

@Injectable({
    providedIn: 'root'
})
export class TransactionsListDataResolver implements Resolve<any> {
    pageData: any;
    onPageDataChanged: BehaviorSubject<any>;

    constructor(
        private dataService: TransactionService, 
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
            // get current month timestamp
            let today = new Date();
            let month = today.getMonth();
            let year = today.getFullYear();
            let minDate = new Date(year, month, 1).getTime()/1000;

            // get next month's timestamp
            let nextMonth = CalendarUtils.nextMonth(month, year);
            let maxDate = new Date(nextMonth.month, nextMonth.year, 1).getTime()/1000;

            // get transactions
            this.dataService.getAll(minDate, maxDate)
                .pipe(take(1))
                .subscribe((response:any) => {
                    let pageData = response.payload ?? response;
                    this.onPageDataChanged.next(pageData);
                    if (isDevMode()) {
                        console.log(`${TransactionsListDataResolver.name}.${this.getPageData.name} data`, 
                        { 
                            pageData: this.pageData
                        })
                    }
                    resolve(pageData);
                }, reject);
        });
    }
}