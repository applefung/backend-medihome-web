export interface ReservationTime {
  date: Date;
  timeslots: Timeslot[];
}

export type UnFormattedReservationTime = Pick<ReservationTime, 'timeslots'> &
  Record<'date', string>;

export type CreateClinicProps = Partial<Clinic> & Record<'districtId', string>;
