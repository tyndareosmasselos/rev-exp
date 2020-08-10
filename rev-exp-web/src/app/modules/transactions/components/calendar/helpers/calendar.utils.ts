import { FIRST_DAYS_MAP } from "../data/month.data";

export abstract class CalendarUtils {
    // calculate next month date
    public static nextMonth(currentMonth: number, currentYear: number){
        if(currentMonth == 11){
            let month = 0;
            let year = currentYear + 1;
            let totalDays = this.totalDays(month, year);
            return {
                year: year,
                month: month,
                totalDays: totalDays,
                totalBlocks: this.getDayBlocks(totalDays, month, year)
            }
        }
        let month = currentMonth + 1;
        let year = currentYear;
        let totalDays = this.totalDays(month, year);
        return {
            year: year,
            month: month,
            totalDays: totalDays,
            totalBlocks: this.getDayBlocks(totalDays, month, year)
        }
    }

    // calculate previous month date
    public static previousMonth(currentMonth: number, currentYear: number){
        if(currentMonth == 0){
            let month = 11;
            let year = currentYear - 1;
            let totalDays = this.totalDays(month, year);
            return {
                year: year,
                month: month,
                totalDays: totalDays,
                totalBlocks: this.getDayBlocks(totalDays, month, year)
            }
        }
        let month = currentMonth - 1;
        let year = currentYear;
        let totalDays = this.totalDays(month, currentYear);
        return {
            year: currentYear,
            month: month,
            totalDays: totalDays,
            totalBlocks: this.getDayBlocks(totalDays, month, year)
        }
    }

    public static getDayBlocks(totalDays: number, month: number, year: number){
        let firstDay = this.getFirstDayOfMonth(month, year);
        let days = [];
        let startingBlocks = FIRST_DAYS_MAP[firstDay];
        for(let z =0; z < startingBlocks; z++){
            days.push(null)
        }
        for(let i =1; i <= totalDays; i++){
            days.push(i)
        }
        if(days.length == 28){
            return days;
        }
        if(days.length > 35){
            let diff = 42 - days.length;
            for(let l = 0; l < diff; l++){
                days.push(null)
            }
        } else {
            let diff = 35 - days.length;
            for(let x = 0; x < diff; x++){
                days.push(null)
            }
        }
        return days;
    }   

    public static totalDays(currentMonth: number, currentYear: number){
        let date = new Date(currentYear, currentMonth, 0)
        return date.getDate();
    }

    public static getFirstDayOfMonth(currentMonth: number, currentYear: number){
        return new Date(currentYear, currentMonth, 1).getDay();
    }

    public static getLastDayOfMonth(currentMonth: number, currentYear: number){
        return new Date(currentYear, currentMonth + 1, 0).getDay();
    }
}