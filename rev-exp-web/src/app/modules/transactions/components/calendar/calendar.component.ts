import { Component, OnInit, isDevMode, Input, ChangeDetectorRef } from '@angular/core';
import { MONTHS } from './data/month.data';
import { CalendarUtils } from './helpers/calendar.utils';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionListDialogComponent } from './dialogs/transaction-list-dialog/transaction-list-dialog.component';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() subject: BehaviorSubject<any>

  selectedMonth: number = null;
  selectedYear: number = null;
  totalDays: number = null;
  dayBlocks: any[] = [];

  days$: Observable<any>;

  // consts
  readonly months = MONTHS;
  readonly days = ["MON", "TUE", 'WED', "THU", "FRI", "SAT", "SUN"]

  constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog, private dataService: TransactionService) { }

  ngOnInit() {
    let today = new Date();
    this.selectedMonth = today.getMonth(); 
    this.selectedYear = today.getFullYear();
    let totalDays = CalendarUtils.totalDays(this.selectedMonth, this.selectedYear);
    this.dayBlocks = CalendarUtils.getDayBlocks(totalDays, this.selectedMonth, this.selectedYear).map(block =>{
      if(block == null){
        return null
      }
      return {
        day: block,
        total: null
      }
    })
    let minDate = new Date(this.selectedYear, this.selectedMonth, 1);
    minDate.setHours(minDate.getHours() + 3);
    let min = minDate.getTime()/1000;
    let nextMonth = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
    let maxDate = new Date(nextMonth.year, nextMonth.month, 1);
    maxDate.setHours(maxDate.getHours() + 2);
    let max = maxDate.getTime()/1000;
    console.log("init", min, max);
    this.dataService.getAll(min, max)
    .pipe(take(1))
    .subscribe((response:any) => {
      console.log("init", response);
        let pageData = response.payload ?? response;
        let transactions = pageData as any[];
        transactions.forEach(tr => {
          Object.keys({...this.dayBlocks}).forEach(key => {
            if(this.dayBlocks[key]?.day == tr.day){
              let block = this.dayBlocks[key];
              let total = block.total;
              if(total){
                block.total = tr.category_id.type == "expense" ? total - tr.amount : total + tr.amount
              } else {
                block.total = tr.amount
              }
              let trans = block?.trans;
              if(trans){
                this.dayBlocks[key].trans.push(tr)
              } else {
                this.dayBlocks[key].trans = [tr]
              }
            }
          })
        })
    })
  }

  async open(trans: any[]){
    if(trans){
      const dialogRef = await this.dialog.open(TransactionListDialogComponent, {
        panelClass: 'category-form-dialog',
        height: null,
        width: '60vw',
        data: trans
      });
      await dialogRef.afterClosed().subscribe(result => {
        if(result == undefined || result == true){
          this.dayBlocks = []
          let totalDays = CalendarUtils.totalDays(this.selectedMonth, this.selectedYear);
          this.dayBlocks = CalendarUtils.getDayBlocks(totalDays, this.selectedMonth, this.selectedYear).map(block =>{
            if(block == null){
              return null
            }
            return {
              day: block,
              total: null
            }
          })
          let minDate = new Date(this.selectedYear, this.selectedMonth, 1);
          minDate.setHours(minDate.getHours() + 3);
          let min = minDate.getTime()/1000;
          let nextMonth = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
          let maxDate = new Date(nextMonth.year, nextMonth.month, 1);
          maxDate.setHours(maxDate.getHours() + 2);
          let max = maxDate.getTime()/1000;
          console.log("init", minDate, maxDate);
          this.dataService.getAll(min, max)
          .pipe(take(1))
          .subscribe((response:any) => {
              let pageData = response.payload ?? response;
              let transactions = pageData as any[];
              transactions.forEach(tr => {
                Object.keys({...this.dayBlocks}).forEach(key => {
                  if(this.dayBlocks[key]?.day == tr.day){
                    let block = this.dayBlocks[key];
                    let total = block.total;
                    if(total){
                      block.total = tr.category_id.type == "expense" ? total - tr.amount : total + tr.amount
                    } else {
                      block.total = tr.amount
                    }
                    let trans = block?.trans;
                    if(trans){
                      this.dayBlocks[key].trans.push(tr)
                    } else {
                      this.dayBlocks[key].trans = [tr]
                    }
                  }
                })
              })
          })
        }
      })
    }
  }

  // calculate new month
  nextMonth(){
    let res = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
    this.selectedMonth = res.month;
    this.selectedYear = res.year;
    this.totalDays = res.totalDays;
    this.dayBlocks = res.totalBlocks.map(block =>{
      if(block == null){
        return null
      }
      return {
        day: block,
        total: null
      }
    })
    let minDate = new Date(this.selectedYear, this.selectedMonth, 1);
    minDate.setHours(minDate.getHours() + 3);
    let min = minDate.getTime()/1000;
    let nextMonth = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
    let maxDate = new Date(nextMonth.year, nextMonth.month, 1);
    maxDate.setHours(maxDate.getHours() + 2);
    let max = maxDate.getTime()/1000;
    console.log("init", minDate, maxDate);
    this.dataService.getAll(min, max)
    .pipe(take(1))
    .subscribe((response:any) => {
        let pageData = response.payload ?? response;
        let transactions = pageData as any[];
        transactions.forEach(tr => {
          Object.keys({...this.dayBlocks}).forEach(key => {
            if(this.dayBlocks[key]?.day == tr.day){
              let block = this.dayBlocks[key];
              let total = block.total;
              if(total){
                block.total = tr.category_id.type == "expense" ? total - tr.amount : total + tr.amount
              } else {
                block.total = tr.amount
              }
              let trans = block?.trans;
              if(trans){
                this.dayBlocks[key].trans.push(tr)
              } else {
                this.dayBlocks[key].trans = [tr]
              }
            }
          })
        })
    })
  }

  // calculate previous month
  previousMonth(){
    let res = CalendarUtils.previousMonth(this.selectedMonth, this.selectedYear);
    this.selectedMonth = res.month;
    this.selectedYear = res.year;
    this.totalDays = res.totalDays;
    this.dayBlocks = res.totalBlocks.map(block =>{
      if(block == null){
        return null
      }
      return {
        day: block,
        total: null
      }
    })
    let minDate = new Date(this.selectedYear, this.selectedMonth, 1);
    minDate.setHours(minDate.getHours() + 3);
    let min = minDate.getTime()/1000;
    let nextMonth = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
    let maxDate = new Date(nextMonth.year, nextMonth.month, 1);
    maxDate.setHours(maxDate.getHours() + 2);
    let max = maxDate.getTime()/1000;
    console.log("init", minDate, maxDate);
    this.dataService.getAll(min, max)
    .pipe(take(1))
    .subscribe((response:any) => {
        let pageData = response.payload ?? response;
        let transactions = pageData as any[];
        transactions.forEach(tr => {
          Object.keys({...this.dayBlocks}).forEach(key => {
            if(this.dayBlocks[key]?.day == tr.day){
              let block = this.dayBlocks[key];
              let total = block.total;
              if(total){
                block.total = tr.category_id.type == "expense" ? total - tr.amount : total + tr.amount
              } else {
                block.total = tr.amount
              }
              let trans = block?.trans;
              if(trans){
                this.dayBlocks[key].trans.push(tr)
              } else {
                this.dayBlocks[key].trans = [tr]
              }
            }
          })
        })
    })
  }

}
