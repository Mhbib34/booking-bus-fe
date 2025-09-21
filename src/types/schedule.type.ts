export class Schedule {
  id?: string;
  route_id?: string;
  departure_time?: string;
  available_seats?: number;
  status?: string;
  price?: number;
  created_at?: string;
  bus_class?: string;
  bus?: {
    bus_number: string;
    bus_type: string;
    total_seats: number;
    facilities: string[];
  };
  origin?: string;
  destination?: string;
}
