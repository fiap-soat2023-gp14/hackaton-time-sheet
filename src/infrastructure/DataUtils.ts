import * as momentTz from "moment-timezone";

export default class DateUtils {

  static generateStartDate(date: Date): string {
    return date.toISOString();
  }

  static generateEndDate(date: string): string {
    const adjustedDate = momentTz.tz(date, 'America/Sao_Paulo').set({ hour: 23, minute: 59, second: 59 });
    return adjustedDate.format();
  }
}
