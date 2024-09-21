import { Item } from './ItemModel.tsx';
import { Profile } from './ProfileModel.tsx';
export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    owned_items: Item[];
    profile: Profile;
}