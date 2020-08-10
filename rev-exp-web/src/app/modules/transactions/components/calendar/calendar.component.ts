import { Component, OnInit } from '@angular/core';
import { MONTHS } from './data/month-locales';
import { CalendarUtils } from './helpers/calendar.utils';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  selectedMonth: number = null;
  selectedYear: number = null;

  // consts
  readonly months = MONTHS;

  constructor() { }

  ngOnInit() {
    let today = new Date();
    this.selectedMonth = today.getMonth();
    this.selectedYear = today.getFullYear();
  }

  // calculate new month
  nextMonth(){
    let res = CalendarUtils.nextMonth(this.selectedMonth, this.selectedYear);
    this.selectedMonth = res.month;
    this.selectedYear = res.year
  }

  // calculate previous month
  previousMonth(){
    let res = CalendarUtils.previousMonth(this.selectedMonth, this.selectedYear);
    this.selectedMonth = res.month;
    this.selectedYear = res.year
  }

}
