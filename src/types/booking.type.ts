export class Booking {
  id?: string;
  booking_code?: string;
  user_id?: string;
  schedule_id?: string;
  passenger_count?: string;
  total_amount?: number;
  schedule?: {
    departure_time?: string;
    route?: {
      origin?: string;
      destination?: string;
    };
  };
  booking_status?: string;
  booking_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}
