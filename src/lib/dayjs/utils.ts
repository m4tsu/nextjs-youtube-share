import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('ja');
dayjs.extend(relativeTime);
const thresholds = [
  { l: 's', r: 1 },
  { l: 'm', r: 1 },
  { l: 'mm', r: 59, d: 'minute' },
  { l: 'h', r: 1 },
  { l: 'hh', r: 23, d: 'hour' },
  { l: 'd', r: 1 },
  { l: 'dd', r: 29, d: 'day' },
  { l: 'M', r: 1 },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y' },
  { l: 'yy', d: 'year' },
];
dayjs.extend(relativeTime, {
  thresholds,
});

const DATE_FORMAT = 'YYYY/MM/DD';
const DATETIME_FORMAT = 'YYYY年MM月DD日 hh:mm';

export const toDate = (date: string | Date) => {
  return dayjs(date).format(DATE_FORMAT);
};

export const toDateTime = (datetime: string | Date) => {
  return dayjs(datetime).format(DATETIME_FORMAT);
};

export const getNowDateTime = () => {
  return dayjs().toISOString();
};

export const fromNow = (datetime: string | Date) => {
  return dayjs(datetime).fromNow();
};
