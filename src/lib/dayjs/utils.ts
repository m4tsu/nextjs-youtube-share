import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';

export const toDate = (date: string | Date) => {
  return dayjs(date).format(dateFormat);
};

export const getNowDateTime = () => {
  return dayjs().toISOString();
};
