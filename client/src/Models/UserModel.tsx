import { Item } from './ItemModel.tsx';
import { Profile } from './ProfileModel.tsx';
import { RentalRequest } from './RentalRequestModel.tsx';
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
    rental_requests_received_pending: RentalRequest[];
}