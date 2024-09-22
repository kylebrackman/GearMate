import { Item } from './ItemModel.tsx';
import { User } from './UserModel.tsx';
export interface RentalRequest {
    id?: number;
    renter: User;
    start_date: string;
    end_date: string;
    item: Item;
    status?: string;
    owner_id?: number;
}
