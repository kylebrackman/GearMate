export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  owned_items: Item[];
  profile: Profile;
  current_rentals: Item[];
  upcoming_rentals: Item[];
  past_rentals: Item[];
  pending_rental_requests: Item[];
  received_pending_rental_requests: RentalRequest[];
}

export interface Item {
  id: number;
  name: string;
  condition: string;
  // Add back in when active_storage is implemented
  // image: string;
  description: string;
  price: number;
  owner_id?: number;
  item_type?: string;
  owner_first_name?: string;
  owner_last_name?: string;
  image?: string;
}

export interface Profile {
  id: number;
  user_id: number;
  // Add back in when active_storage is implemented
  // profile_picture: string;
  bio: string;
  location: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
}

export interface Rental {
  id: number;
  item_id: number;
  renter_id: number;
  start_date: string;
  end_date: string;
}

export interface RentalRequest {
  id?: number;
  renter: User;
  start_date: string;
  end_date: string;
  item: Item;
  status?: string;
  owner_id?: number;
}