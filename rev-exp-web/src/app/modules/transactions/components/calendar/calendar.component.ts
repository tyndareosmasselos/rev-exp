import { Component, OnInit, isDevMode, Input, ChangeDetectorRef } from '@angular/core';
import { MONTHS } from './data/month.data';
import { CalendarUtils } from './helpers/calendar.utils';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

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

  constructor(private cdr: ChangeDetectorRef) { }

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
    if(isDevMode()){
      console.log(`${CalendarComponent.name} ngOnInit`, {
        selectedMonth: this.selectedMonth,
        selectedYear: this.selectedYear,
        totalDays: this.totalDays
      });
    }
    this.subject.pipe().subscribe(res => {
      console.log("receive res", res);
      console.log("blcok", this.dayBlocks);
      Object.keys(res).forEach(key => {
        let index = this.dayBlocks.findIndex(x => {
          if(x == null){
            return false
          }
          return x.day == key
        })
        this.dayBlocks[index] = {...this.dayBlocks[index], ...res[key]}
      })
      console.log('receive', this.dayBlocks);
      this.cdr.detectChanges();
    })
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
    if(isDevMode()){
      console.log(`${CalendarComponent.name} next month res`, {
        selectedMonth: this.selectedMonth,
        selectedYear: this.selectedYear,
        totalDays: this.totalDays,
        dayBlocks: this.dayBlocks
      });
    }
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
    if(isDevMode()){
      console.log(`${CalendarComponent.name} previous month res`, {
        selectedMonth: this.selectedMonth,
        selectedYear: this.selectedYear,
        totalDays: this.totalDays,
        dayBlocks: this.dayBlocks
      });
    }
  }

}
