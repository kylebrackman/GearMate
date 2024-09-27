import { Item } from "./ItemModel";
import { User } from "./UserModel";

export interface Rental {
    id: number;
    item_id: number;
    renter_id: number;
    start_date: string;
    end_date: string;
    owner: User;
    item: Item;
    owner_profile_id: number;
    rental_request_id: number;
}