import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInDays from 'date-fns/differenceInDays';

// FIXME: TimeZoneを意識して作り直したほうが良いかも！

const LOCAL_SERVER_FORMAT = 'yyyyMMdd';
const LOCAL_JP_FORMAT = 'yyyy年MM月dd日';

export function toYYYYMMDD(date: Date): string {
  return toDateFormatString(date);
}

export function toDate(date: string, dateFormat: string = LOCAL_SERVER_FORMAT): Date {
  return parse(date, dateFormat, new Date());
}

export function toDeliveryDate(date: Date): string {
  const days = getDeliveryDays(date);
  const targetFormat = toDateFormatString(date, LOCAL_JP_FORMAT);
  return `${targetFormat} ${days}日後`;
}

export function getDeliveryDays(targetDate: Date, today: Date = new Date()): number {
  return differenceInDays(targetDate, today);
}

export function toDateFormatString(value: Date, dateFormat: string = LOCAL_SERVER_FORMAT): string {
  return format(value, dateFormat, { awareOfUnicodeTokens: true });
}
