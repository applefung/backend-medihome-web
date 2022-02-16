import dayjs from 'dayjs';
import type { UnFormattedReservationTime } from '@src/types/clinic';

export const formatReservationTime = (
  reservationTime: UnFormattedReservationTime[],
) =>
  reservationTime.map(({ date, timeslots }) => ({
    date: dayjs(date).toDate(),
    timeslots,
  }));
