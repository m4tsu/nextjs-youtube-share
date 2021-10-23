import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';

export const toDate = (dateString: string) => {
  return dayjs(dateString).format(dateFormat);
};

export const getNowDateTime = () => {
  return dayjs().toISOString();
};
