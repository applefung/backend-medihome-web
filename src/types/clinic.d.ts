export interface ReservationTime {
  date: Date;
  timeslots: Timeslot[];
}

export type UnFormattedReservationTime = Pick<ReservationTime, 'timeslots'> &
  Record<'date', string>;
