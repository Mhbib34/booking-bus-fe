export class Schedule {
  id?: string;
  route_id?: string;
  departure_time?: string;
  departure_date?: string;
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
  route?: {
    origin: string;
    destination: string;
  };
}
