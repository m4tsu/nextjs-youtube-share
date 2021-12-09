import dayjs from 'dayjs';

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
