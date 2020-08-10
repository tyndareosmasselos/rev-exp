import { Component, OnInit, isDevMode } from '@angular/core';
import { MONTHS } from './data/month.data';
import { CalendarUtils } from './helpers/calendar.utils';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedMonth: number = null;
  selectedYear: number = null;
  totalDays: number = null;
  dayBlocks: number[] = [];

  // consts
  readonly months = MONTHS;
  readonly days = ["MON", "TUE", 'WED', "THU", "FRI", "SAT", "SUN"]

  constructor() { }

  ngOnInit() {
    let today = new Date();
    this.selectedMonth = today.getMonth(); 
    this.selectedYear = today.getFullYear();
    let totalDays = CalendarUtils.totalDays(this.selectedMonth, this.selectedYear);
    this.dayBlocks = CalendarUtils.getDayBlocks(totalDays, this.selectedMonth, this.selectedYear);
    if(isDevMode()){
      console.log(`${CalendarComponent.name} ngOnInit`, {
        selectedMonth: this.selectedMonth,
        selectedYear: this.selectedYear,
        totalDays: this.totalDays
      });
    }
  }

  // calculate new month
  nextMonth(){
    let res = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
    this.selectedMonth = res.month;
    this.selectedYear = res.year;
    this.totalDays = res.totalDays;
    this.dayBlocks = res.totalBlocks;
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
    this.dayBlocks = res.totalBlocks;
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
