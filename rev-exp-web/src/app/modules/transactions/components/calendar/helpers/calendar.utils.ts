export abstract class CalendarUtils {
    // calculate next month date
    public static nextMonth(currentMonth: number, currentYear: number){
        if(currentMonth == 11)
            return {
                year: currentYear + 1,
                month: 0
            }
        return {
            year: currentYear,
            month: currentMonth + 1
        }
    }

    // calculate previous month date
    public static previousMonth(currentMonth: number, currentYear: number){
        if(currentMonth == 0)
            return {
                year: currentYear - 1,
                month: 11
            }
        return {
            year: currentYear,
            month: currentMonth - 1
        }
    }
}